/* =========================================================
   HADOTIWALEBHAIYA
   MAIN JAVASCRIPT
   STEP 4
========================================================= */

"use strict";


/* =========================================================
   GLOBAL STATE
========================================================= */

const HWB = {
    searchCategory: "all",
    savedDestinations: new Set(),
    currentModal: null
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeNavigation();

    initializeSearch();

    initializeAIPlanner();

    initializeDestinationCards();

    initializeQuickAccess();

    initializeButtons();

    initializeModalSystem();

    initializeYear();

    initializeKeyboardSupport();

    loadSavedDestinations();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

            setTimeout(() => {
                loader.style.display = "none";
            }, 700);

        }, 500);

    });

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigation() {

    const header = document.getElementById("siteHeader");

    const mobileButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-link");

    const navLinks =
        document.querySelectorAll(".nav-link");


    /* Header scroll */

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        updateActiveNavigation();

    });


    /* Mobile menu */

    if (mobileButton && mobileMenu) {

        mobileButton.addEventListener("click", () => {

            const isOpen =
                mobileButton.getAttribute("aria-expanded") === "true";

            mobileButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                String(isOpen)
            );

            mobileMenu.classList.toggle("open", !isOpen);

            document.body.classList.toggle(
                "menu-open",
                !isOpen
            );

        });

    }


    /* Close mobile menu after navigation */

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* Desktop navigation */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

}


function closeMobileMenu() {

    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    if (!button || !menu) return;

    button.setAttribute(
        "aria-expanded",
        "false"
    );

    menu.setAttribute(
        "aria-hidden",
        "true"
    );

    menu.classList.remove("open");

    document.body.classList.remove("menu-open");

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${currentSection}`
        );

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    const header =
        document.getElementById("siteHeader");

    const headerHeight =
        header ? header.offsetHeight : 0;

    const position =
        element.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

    window.scrollTo({
        top: position,
        behavior: "smooth"
    });

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function initializeSearch() {

    const headerSearch =
        document.getElementById("headerSearchButton");

    const heroSearch =
        document.getElementById("heroSearch");

    const destinationSearch =
        document.getElementById("destinationSearch");

    const clearSearch =
        document.getElementById("clearSearch");


    if (headerSearch) {

        headerSearch.addEventListener("click", () => {

            openModal("searchModal");

            setTimeout(() => {

                if (destinationSearch) {
                    destinationSearch.focus();
                }

            }, 250);

        });

    }


    if (heroSearch) {

        heroSearch.addEventListener("click", () => {

            openModal("searchModal");

            setTimeout(() => {

                if (destinationSearch) {
                    destinationSearch.focus();
                }

            }, 250);

        });


        heroSearch.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openModal("searchModal");

                setTimeout(() => {

                    if (destinationSearch) {
                        destinationSearch.focus();
                    }

                }, 250);

            }

        });

    }


    if (destinationSearch) {

        destinationSearch.addEventListener(
            "input",
            () => {

                renderSearchResults(
                    destinationSearch.value.trim()
                );

            }
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener("click", () => {

            if (!destinationSearch) return;

            destinationSearch.value = "";

            renderSearchResults("");

            destinationSearch.focus();

        });

    }


    /* Search categories */

    const categories =
        document.querySelectorAll(".search-category");

    categories.forEach(category => {

        category.addEventListener("click", () => {

            categories.forEach(item => {
                item.classList.remove("active");
            });

            category.classList.add("active");

            HWB.searchCategory =
                category.dataset.category || "all";

            const value =
                destinationSearch
                    ? destinationSearch.value.trim()
                    : "";

            renderSearchResults(value);

        });

    });


    renderSearchResults("");

}


/* =========================================================
   GET DESTINATION DATABASE
========================================================= */

function getDestinations() {

    /*
       destinations.js should create:

       window.HADOTI_DESTINATIONS = [...]

       If it doesn't exist, return an empty array.
    */

    if (
        Array.isArray(
            window.HADOTI_DESTINATIONS
        )
    ) {

        return window.HADOTI_DESTINATIONS;

    }

    return [];

}


/* =========================================================
   SEARCH RESULTS
========================================================= */

function renderSearchResults(query = "") {

    const container =
        document.getElementById("searchResults");

    if (!container) return;


    let destinations =
        getDestinations();


    /* Category filter */

    if (HWB.searchCategory !== "all") {

        destinations =
            destinations.filter(item => {

                return (
                    item.category ===
                    HWB.searchCategory
                );

            });

    }


    /* Text search */

    if (query) {

        const search =
            query.toLowerCase();

        destinations =
            destinations.filter(item => {

                const searchableText = [

                    item.name,
                    item.state,
                    item.country,
                    item.region,
                    item.category,
                    item.description

                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

                return searchableText.includes(search);

            });

    }


    /* Empty state */

    if (!destinations.length) {

        container.innerHTML = `

            <div class="search-empty">

                <i class="fa-solid fa-map-location-dot"></i>

                <p>
                    No destinations found.
                </p>

                <small>
                    Try another city, state or destination.
                </small>

            </div>

        `;

        return;

    }


    /* Show limited results */

    const results =
        destinations.slice(0, 12);


    container.innerHTML =
        results.map(destination => {

            return `

                <button
                    type="button"
                    class="search-result-item"
                    data-destination-id="${escapeHTML(
                        destination.id || ""
                    )}"
                >

                    <span class="search-result-icon">

                        <i class="fa-solid fa-location-dot"></i>

                    </span>

                    <span class="search-result-content">

                        <strong>
                            ${escapeHTML(
                                destination.name || "Unknown"
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                destination.state || ""
                            )}
                            ${destination.country
                                ? " • " +
                                  escapeHTML(destination.country)
                                : ""
                            }
                        </small>

                    </span>

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            `;

        })
        .join("");


    /* Result click */

    const resultButtons =
        container.querySelectorAll(
            ".search-result-item"
        );


    resultButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.dataset.destinationId;

            openDestination(id);

        });

    });

}


/* =========================================================
   OPEN DESTINATION
========================================================= */

function openDestination(id) {

    const destination =
        getDestinations().find(
            item => String(item.id) === String(id)
        );


    if (!destination) {

        showToast(
            "Destination information unavailable."
        );

        return;

    }


    closeModal("searchModal");


    const title =
        destination.name || "Destination";


    const location = [

        destination.region,
        destination.state,
        destination.country

    ]
    .filter(Boolean)
    .join(" • ");


    const body = `

        <div class="destination-info">

            <div class="destination-info-icon">

                <i class="fa-solid fa-location-dot"></i>

            </div>

            <span class="modal-kicker">
                ${escapeHTML(
                    destination.category ||
                    "DESTINATION"
                )}
            </span>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p class="destination-location">
                ${escapeHTML(location)}
            </p>

            <p>
                ${escapeHTML(
                    destination.description ||
                    "Discover this destination with HADOTIWALEBHAIYA."
                )}
            </p>

            <button
                type="button"
                class="primary-button"
                id="destinationPlanButton"
            >

                <i class="fa-solid fa-route"></i>

                <span>
                    Plan a trip here
                </span>

            </button>

        </div>

    `;


    showInfoModal(
        title,
        body
    );


    setTimeout(() => {

        const planButton =
            document.getElementById(
                "destinationPlanButton"
            );

        if (planButton) {

            planButton.addEventListener(
                "click",
                () => {

                    closeModal("infoModal");

                    openModal("aiPlannerModal");

                    const input =
                        document.getElementById(
                            "plannerDestination"
                        );

                    if (input) {
                        input.value = title;
                    }

                }
            );

        }

    }, 50);

}


/* =========================================================
   AI TRIP PLANNER
========================================================= */

function initializeAIPlanner() {

    const buttons = [

        document.getElementById("heroAIButton"),

        document.getElementById("openAIPlanner")

    ];


    buttons.forEach(button => {

        if (!button) return;

        button.addEventListener("click", () => {

            openModal("aiPlannerModal");

        });

    });


    const form =
        document.getElementById("plannerForm");


    if (!form) return;


    form.addEventListener("submit", event => {

        event.preventDefault();

        createTripPlan(form);

    });

}


/* =========================================================
   CREATE TRIP PLAN
========================================================= */

function createTripPlan(form) {

    const destination =
        document.getElementById(
            "plannerDestination"
        )?.value.trim();


    const days =
        document.getElementById(
            "plannerDays"
        )?.value;


    const budget =
        document.getElementById(
            "plannerBudget"
        )?.value;


    const style =
        document.getElementById(
            "plannerStyle"
        )?.value;


    const result =
        document.getElementById(
            "plannerResult"
        );


    if (!destination) {

        showToast(
            "Please enter your destination."
        );

        return;

    }


    if (!result) return;


    const dayCount =
        Number(days) > 0
            ? Number(days)
            : 3;


    const budgetText =
        Number(budget) > 0
            ? `₹${Number(budget).toLocaleString("en-IN")}`
            : "Flexible";


    const styleName =
        getTravelStyleName(style);


    result.hidden = false;


    result.innerHTML = `

        <div class="planner-result-inner">

            <span class="modal-kicker">
                YOUR TRAVEL BLUEPRINT
            </span>

            <h3>
                ${escapeHTML(destination)}
            </h3>

            <div class="planner-summary">

                <div>
                    <strong>
                        ${dayCount}
                    </strong>
                    <small>
                        Days
                    </small>
                </div>

                <div>
                    <strong>
                        ${escapeHTML(budgetText)}
                    </strong>
                    <small>
                        Budget
                    </small>
                </div>

                <div>
                    <strong>
                        ${escapeHTML(styleName)}
                    </strong>
                    <small>
                        Style
                    </small>
                </div>

            </div>


            <div class="planner-placeholder">

                <i class="fa-solid fa-wand-magic-sparkles"></i>

                <p>
                    Your AI-powered detailed itinerary
                    will be generated here.
                </p>

                <small>
                    This is the foundation layer.
                    Real AI planning can be connected
                    in the next development phase.
                </small>

            </div>

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });


    showToast(
        "Your journey blueprint is ready."
    );

}


/* =========================================================
   TRAVEL STYLE NAME
========================================================= */

function getTravelStyleName(style) {

    const styles = {

        balanced: "Balanced",
        budget: "Budget",
        luxury: "Luxury",
        adventure: "Adventure",
        culture: "Culture",
        nature: "Nature"

    };

    return styles[style] || "Balanced";

}


/* =========================================================
   DESTINATION CARDS
========================================================= */

function initializeDestinationCards() {

    const cards =
        document.querySelectorAll(
            ".destination-card"
        );


    cards.forEach(card => {

        card.addEventListener("click", event => {

            /*
              Don't open destination when
              heart button is clicked.
            */

            if (
                event.target.closest(
                    ".destination-save"
                )
            ) {
                return;
            }


            const id =
                card.dataset.destination;


            if (id) {
                openDestination(id);
            }

        });

    });


    const saveButtons =
        document.querySelectorAll(
            ".destination-save"
        );


    saveButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.stopPropagation();

            const id =
                button.dataset.save;

            if (!id) return;

            toggleSavedDestination(
                id,
                button
            );

        });

    });

}


/* =========================================================
   SAVE DESTINATION
========================================================= */

function toggleSavedDestination(
    id,
    button
) {

    if (
        HWB.savedDestinations.has(id)
    ) {

        HWB.savedDestinations.delete(id);

        button.classList.remove("saved");

        button.innerHTML =
            `<i class="fa-reg