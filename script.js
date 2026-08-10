/* =========================================================
   HADOTIWALEBHAIYA
   MAIN WEBSITE JAVASCRIPT
   STEP 4
========================================================= */

"use strict";


/* =========================================================
   GLOBAL STATE
========================================================= */

const HWB = {

    searchCategory: "all",

    savedDestinations:
        JSON.parse(
            localStorage.getItem("HWB_SAVED_DESTINATIONS") || "[]"
        ),

    mobileMenuOpen: false

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeHeader();

    initializeNavigation();

    initializeSearch();

    initializePlanner();

    initializeDestinationCards();

    initializeQuickAccess();

    initializeButtons();

    initializeModals();

    initializeFooter();

    initializeScrollEffects();

    initializeYear();

    restoreSavedDestinations();

});


/* =========================================================
   DESTINATION DATABASE CONNECTION
========================================================= */

function getDestinations() {

    /*
       IMPORTANT:

       Your existing destinations.js uses:

       window.HWB_DESTINATIONS

       So we use that database here.
    */

    if (
        Array.isArray(
            window.HWB_DESTINATIONS
        )
    ) {

        return window.HWB_DESTINATIONS;

    }

    console.warn(
        "HADOTIWALEBHAIYA: destinations.js database not found."
    );

    return [];

}


/* =========================================================
   PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

            setTimeout(() => {

                loader.style.display = "none";

            }, 600);

        }, 500);

    });

}


/* =========================================================
   HEADER
========================================================= */

function initializeHeader() {

    const header =
        document.getElementById("siteHeader");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeNavigation() {

    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    if (!button || !menu) return;

    button.addEventListener("click", () => {

        HWB.mobileMenuOpen =
            !HWB.mobileMenuOpen;

        button.classList.toggle(
            "active",
            HWB.mobileMenuOpen
        );

        menu.classList.toggle(
            "open",
            HWB.mobileMenuOpen
        );

        button.setAttribute(
            "aria-expanded",
            String(HWB.mobileMenuOpen)
        );

        menu.setAttribute(
            "aria-hidden",
            String(!HWB.mobileMenuOpen)
        );

    });


    document
        .querySelectorAll(".mobile-nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });

}


function closeMobileMenu() {

    const button =
        document.getElementById("mobileMenuButton");

    const menu =
        document.getElementById("mobileMenu");

    HWB.mobileMenuOpen = false;

    if (button) {

        button.classList.remove("active");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (menu) {

        menu.classList.remove("open");

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function initializeNavigationLinks() {

    const links =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item =>
                item.classList.remove("active")
            );

            link.classList.add("active");

        });

    });

}


/* =========================================================
   SEARCH SYSTEM
========================================================= */

function initializeSearch() {

    const headerSearch =
        document.getElementById(
            "headerSearchButton"
        );

    const heroSearch =
        document.getElementById(
            "heroSearch"
        );

    const searchInput =
        document.getElementById(
            "destinationSearch"
        );

    const clearButton =
        document.getElementById(
            "clearSearch"
        );


    if (headerSearch) {

        headerSearch.addEventListener(
            "click",
            () => {

                openModal("searchModal");

                setTimeout(() => {

                    if (searchInput) {

                        searchInput.focus();

                    }

                }, 200);

            }
        );

    }


    if (heroSearch) {

        heroSearch.addEventListener(
            "click",
            openSearch
        );

        heroSearch.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openSearch();

                }

            }
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                renderSearchResults(
                    searchInput.value.trim()
                );

            }
        );

    }


    if (clearButton) {

        clearButton.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                    searchInput.focus();

                }

                renderSearchResults("");

            }
        );

    }


    document
        .querySelectorAll(".search-category")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".search-category"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    button.classList.add("active");

                    HWB.searchCategory =
                        button.dataset.category ||
                        "all";

                    renderSearchResults(
                        searchInput
                            ? searchInput.value.trim()
                            : ""
                    );

                }
            );

        });

}


function openSearch() {

    openModal("searchModal");

    const input =
        document.getElementById(
            "destinationSearch"
        );

    setTimeout(() => {

        if (input) {

            input.focus();

        }

    }, 200);

}


/* =========================================================
   SEARCH RESULTS
========================================================= */

function renderSearchResults(query = "") {

    const container =
        document.getElementById(
            "searchResults"
        );

    if (!container) return;

    const destinations =
        getDestinations();

    let results = destinations.slice();


    /* CATEGORY FILTER */

    if (
        HWB.searchCategory !== "all"
    ) {

        results =
            results.filter(item => {

                if (
                    Array.isArray(item.category)
                ) {

                    return item.category.includes(
                        HWB.searchCategory
                    );

                }

                return (
                    item.category ===
                    HWB.searchCategory
                );

            });

    }


    /* TEXT SEARCH */

    if (query) {

        const search =
            query.toLowerCase();

        results =
            results.filter(item => {

                const searchableText = [

                    item.name,

                    item.state,

                    item.country,

                    item.region,

                    item.tagline,

                    item.description,

                    ...(Array.isArray(item.tags)
                        ? item.tags
                        : [])

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(
                    search
                );

            });

    }


    /* EMPTY */

    if (!results.length) {

        container.innerHTML = `

            <div class="search-empty">

                <i class="fa-solid fa-compass"></i>

                <p>
                    No destinations found.
                </p>

                <small>
                    Try another city, state or country.
                </small>

            </div>

        `;

        return;

    }


    /*
       Without a search query,
       show a limited number.
    */

    const visibleResults =
        query
            ? results.slice(0, 30)
            : results.slice(0, 12);


    container.innerHTML =
        visibleResults
            .map(
                destination =>
                    createSearchResult(
                        destination
                    )
            )
            .join("");


    container
        .querySelectorAll(
            "[data-result-id]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    const id =
                        element.dataset.resultId;

                    openDestination(id);

                }
            );

        });

}


function createSearchResult(destination) {

    const icon =
        destination.icon ||
        "fa-location-dot";

    const location =
        [
            destination.state,
            destination.country
        ]
            .filter(Boolean)
            .join(" • ");


    return `

        <button
            type="button"
            class="search-result-item"
            data-result-id="${escapeHTML(
                destination.id || ""
            )}"
        >

            <span class="search-result-icon">

                <i class="fa-solid ${escapeHTML(
                    icon
                )}"></i>

            </span>

            <span class="search-result-content">

                <strong>
                    ${escapeHTML(
                        destination.name || ""
                    )}
                </strong>

                <small>
                    ${escapeHTML(location)}
                </small>

            </span>

            <i class="fa-solid fa-arrow-right"></i>

        </button>

    `;

}


/* =========================================================
   DESTINATION CARDS
========================================================= */

function initializeDestinationCards() {

    document
        .querySelectorAll(
            ".destination-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                event => {

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

                }
            );

        });


    document
        .querySelectorAll(
            ".destination-save"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const id =
                        button.dataset.save;

                    if (id) {

                        toggleSavedDestination(
                            id,
                            button
                        );

                    }

                }
            );

        });

}


/* =========================================================
   SAVE DESTINATION
========================================================= */

function toggleSavedDestination(
    id,
    button
) {

    const index =
        HWB.savedDestinations.indexOf(id);


    if (index === -1) {

        HWB.savedDestinations.push(id);

        button.classList.add("saved");

        updateHeartIcon(button, true);

        showToast(
            "Destination saved"
        );

    } else {

        HWB.savedDestinations.splice(
            index,
            1
        );

        button.classList.remove("saved");

        updateHeartIcon(button, false);

        showToast(
            "Destination removed"
        );

    }


    localStorage.setItem(
        "HWB_SAVED_DESTINATIONS",
        JSON.stringify(
            HWB.savedDestinations
        )
    );

}


function updateHeartIcon(
    button,
    saved
) {

    const icon =
        button.querySelector("i");

    if (!icon) return;

    if (saved) {

        icon.classList.remove(
            "fa-regular"
        );

        icon.classList.add(
            "fa-solid"
        );

    } else {

        icon.classList.remove(
            "fa-solid"
        );

        icon.classList.add(
            "fa-regular"
        );

    }

}


function restoreSavedDestinations() {

    document
        .querySelectorAll(
            ".destination-save"
        )
        .forEach(button => {

            const id =
                button.dataset.save;

            if (
                HWB.savedDestinations.includes(id)
            ) {

                button.classList.add("saved");

                updateHeartIcon(
                    button,
                    true
                );

            }

        });

}


/* =========================================================
   OPEN DESTINATION
========================================================= */

function openDestination(id) {

    const destinations =
        getDestinations();

    const destination =
        destinations.find(
            item =>
                item.id === id
        );


    if (!destination) {

        showToast(
            "Destination information not available"
        );

        return;

    }


    const body =
        document.getElementById(
            "infoModalBody"
        );

    const title =
        document.getElementById(
            "infoModalTitle"
        );


    if (!body || !title) return;


    title.textContent =
        destination.name ||
        "Destination";


    const location =
        [
            destination.state,
            destination.country
        ]
            .filter(Boolean)
            .join(" • ");


    const categories =
        Array.isArray(destination.category)
            ? destination.category
            : destination.category
                ? [destination.category]
                : [];


    const tags =
        Array.isArray(destination.tags)
            ? destination.tags
            : [];


    body.innerHTML = `

        <div class="destination-detail">

            <div class="destination-detail-icon">

                <i class="fa-solid ${
                    escapeHTML(
                        destination.icon ||
                        "fa-location-dot"
                    )
                }"></i>

            </div>

            <span class="modal-kicker">
                ${escapeHTML(
                    location
                )}
            </span>

            <h3>
                ${escapeHTML(
                    destination.tagline ||
                    destination.name ||
                    ""
                )}
            </h3>

            <p>
                ${escapeHTML(
                    destination.description ||
                    "Discover this destination."
                )}
            </p>

            ${
                categories.length
                    ? `
                        <div class="detail-tags">
                            ${categories
                                .map(
                                    category =>
                                        `<span>
                                            ${escapeHTML(
                                                category
                                            )}
                                        </span>`
                                )
                                .join("")}
                        </div>
                    `
                    : ""
            }

            ${
                tags.length
                    ? `
                        <div class="detail-tags">
                            ${tags
                                .map(
                                    tag =>
                                        `<span>
                                            #${escapeHTML(
                                                tag
                                            )}
                                        </span>`
                                )
                                .join("")}
                        </div>
                    `
                    : ""
            }

            ${
                destination.coordinates
                    ? `
                        <div class="destination-coordinates">

                            <i class="fa-solid fa-map-location-dot"></i>

                            <span>
                                ${
                                    destination.coordinates.latitude
                                },
                                ${
                                    destination.coordinates.longitude
                                }
                            </span>

                        </div>
                    `
                    : ""
            }

            <button
                type="button"
                class="primary-button"
                id="detailPlannerButton"
            >

                <i class="fa-solid fa-route"></i>

                Plan a trip here

            </button>

        </div>

    `;


    openModal("infoModal");


    const plannerButton =
        document.getElementById(
            "detailPlannerButton"
        );


    if (plannerButton) {

        plannerButton.addEventListener(
            "click",
            () => {

                closeModal("infoModal");

                openModal("aiPlannerModal");

                const destinationInput =
                    document.getElementById(
                        "plannerDestination"
                    );

                if (destinationInput) {

                    destinationInput.value =
               