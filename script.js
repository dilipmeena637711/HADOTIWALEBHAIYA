/* =========================================================
   HADOTIWALEBHAIYA
   MAIN JAVASCRIPT
   STEP 2
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const pageLoader = document.getElementById("pageLoader");
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const headerSearchButton =
        document.getElementById("headerSearchButton");

    const heroSearch =
        document.getElementById("heroSearch");

    const searchModal =
        document.getElementById("searchModal");

    const destinationSearch =
        document.getElementById("destinationSearch");

    const searchResults =
        document.getElementById("searchResults");

    const clearSearch =
        document.getElementById("clearSearch");

    const aiPlannerModal =
        document.getElementById("aiPlannerModal");

    const plannerForm =
        document.getElementById("plannerForm");

    const plannerResult =
        document.getElementById("plannerResult");

    const infoModal =
        document.getElementById("infoModal");

    const infoModalTitle =
        document.getElementById("infoModalTitle");

    const infoModalBody =
        document.getElementById("infoModalBody");

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       GLOBAL STATE
    ===================================================== */

    let activeSearchCategory = "all";

    let toastTimer = null;

    let savedDestinations =
        JSON.parse(
            localStorage.getItem(
                "hadotiSavedDestinations"
            ) || "[]"
        );


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {

                pageLoader.classList.add("hidden");

                pageLoader.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }, 500);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu || !mobileMenuButton) {
            return;
        }

        mobileMenu.classList.add("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        mobileMenuButton.classList.add("active");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        if (!mobileMenu || !mobileMenuButton) {
            return;
        }

        mobileMenu.classList.remove("open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        mobileMenuButton.classList.remove(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenuButton.getAttribute(
                        "aria-expanded"
                    ) === "true";

                if (isOpen) {

                    closeMobileMenu();

                } else {

                    openMobileMenu();

                }

            }
        );

    }


    /* -----------------------------------------------------
       MOBILE NAV LINKS
    ----------------------------------------------------- */

    document
        .querySelectorAll(".mobile-nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       MODAL FUNCTIONS
    ===================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (
            !document.querySelector(
                ".modal-overlay.open"
            )
        ) {

            document.body.classList.remove(
                "modal-open"
            );

        }

    }


    /* =====================================================
       SEARCH MODAL
    ===================================================== */

    function openSearch() {

        openModal(searchModal);

        setTimeout(() => {

            if (destinationSearch) {

                destinationSearch.focus();

            }

        }, 150);

        renderSearchResults(
            destinationSearch
                ? destinationSearch.value
                : ""
        );

    }


    if (headerSearchButton) {

        headerSearchButton.addEventListener(
            "click",
            openSearch
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


    /* =====================================================
       DESTINATION DATABASE
    ===================================================== */

    const defaultDestinations = [

        {
            id: "bundi",
            name: "Bundi",
            state: "Rajasthan",
            country: "India",
            category: "heritage",
            type: "destination",
            description:
                "Historic palaces, stepwells, paintings and the blue streets of Hadoti."
        },

        {
            id: "jaipur",
            name: "Jaipur",
            state: "Rajasthan",
            country: "India",
            category: "heritage",
            type: "destination",
            description:
                "The Pink City known for forts, palaces and colourful markets."
        },

        {
            id: "udaipur",
            name: "Udaipur",
            state: "Rajasthan",
            country: "India",
            category: "nature",
            type: "destination",
            description:
                "Lakes, palaces and scenic landscapes of southern Rajasthan."
        },

        {
            id: "jaisalmer",
            name: "Jaisalmer",
            state: "Rajasthan",
            country: "India",
            category: "nature",
            type: "destination",
            description:
                "Golden architecture, desert landscapes and unforgettable sunsets."
        },

        {
            id: "kota",
            name: "Kota",
            state: "Rajasthan",
            country: "India",
            category: "destination",
            type: "destination",
            description:
                "A major city of Hadoti on the Chambal River."
        },

        {
            id: "jodhpur",
            name: "Jodhpur",
            state: "Rajasthan",
            country: "India",
            category: "heritage",
            type: "destination",
            description:
                "The Blue City dominated by the magnificent Mehrangarh Fort."
        },

        {
            id: "mount-abu",
            name: "Mount Abu",
            state: "Rajasthan",
            country: "India",
            category: "nature",
            type: "destination",
            description:
                "Rajasthan's famous hill destination with forests and mountain views."
        },

        {
            id: "ranthambore",
            name: "Ranthambore",
            state: "Rajasthan",
            country: "India",
            category: "nature",
            type: "destination",
            description:
                "A famous wildlife destination known for its tiger reserve."
        }

    ];


    /*
       If destinations.js exists and exposes
       HADOTI_DESTINATIONS, use it.
       Otherwise use the built-in list.
    */

    let destinations =
        Array.isArray(
            window.HADOTI_DESTINATIONS
        )
            ? window.HADOTI_DESTINATIONS
            : defaultDestinations;


    /* =====================================================
       SEARCH RESULT ICON
    ===================================================== */

    function getCategoryIcon(category) {

        if (category === "heritage") {

            return "fa-landmark";

        }

        if (category === "nature") {

            return "fa-mountain-sun";

        }

        return "fa-location-dot";

    }


    /* =====================================================
       SEARCH RESULTS
    ===================================================== */

    function renderSearchResults(query = "") {

        if (!searchResults) return;

        const cleanQuery =
            query.trim().toLowerCase();


        let filtered =
            destinations.filter(item => {

                const categoryMatch =
                    activeSearchCategory === "all" ||
                    item.type === activeSearchCategory ||
                    item.category === activeSearchCategory;

                if (!categoryMatch) {
                    return false;
                }


                if (!cleanQuery) {
                    return true;
                }


                const searchableText = [

                    item.name,
                    item.state,
                    item.country,
                    item.category,
                    item.description

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return searchableText.includes(
                    cleanQuery
                );

            });


        filtered =
            filtered.slice(0, 12);


        if (filtered.length === 0) {

            searchResults.innerHTML = `

                <div class="search-empty">

                    <i class="fa-solid fa-location-question"></i>

                    <p>
                        No destination found.
                    </p>

                    <small>
                        Try another city, state or destination.
                    </small>

                </div>

            `;

            return;

        }


        searchResults.innerHTML =
            filtered
                .map(item => `

                    <button
                        type="button"
                        class="search-result-item"
                        data-destination-result="${escapeHTML(item.id)}"
                    >

                        <span class="search-result-icon">

                            <i class="fa-solid ${getCategoryIcon(item.category)}"></i>

                        </span>


                        <span class="search-result-content">

                            <strong>
                                ${escapeHTML(item.name)}
                            </strong>

                            <small>
                                ${escapeHTML(item.state || "")}
                                ${item.state && item.country ? " • " : ""}
                                ${escapeHTML(item.country || "")}
                            </small>

                            <p>
                                ${escapeHTML(item.description || "")}
                            </p>

                        </span>


                        <i class="fa-solid fa-arrow-right search-result-arrow"></i>

                    </button>

                `)
                .join("");


        document
            .querySelectorAll(
                "[data-destination-result]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset
                                .destinationResult;

                        showDestination(
                            id
                        );

                    }
                );

            });

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        if (value === null ||
            value === undefined) {

            return "";

        }


        return String(value)
            .replace(
                /[&<>"']/g,
                character => {

                    const entities = {

                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#039;"

                    };

                    return entities[
                        character
                    ];

                }
            );

    }


    /* =====================================================
       SEARCH INPUT
    ===================================================== */

    if (destinationSearch) {

        destinationSearch.addEventListener(
            "input",
            () => {

                renderSearchResults(
                    destinationSearch.value
                );

            }
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (!destinationSearch) {
                    return;
                }

                destinationSearch.value = "";

                destinationSearch.focus();

                renderSearchResults("");

            }
        );

    }


    /* =====================================================
       SEARCH CATEGORIES
    ===================================================== */

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
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    activeSearchCategory =
                        button.dataset.category ||
                        "all";


                    renderSearchResults(
                        destinationSearch
                            ? destinationSearch.value
                            : ""
                    );

                }
            );

        });


    /* =====================================================
       SHOW DESTINATION
    ===================================================== */

    function showDestination(id) {

        const destination =
            destinations.find(
                item => item.id === id
            );


        if (!destination) {

            showToast(
                "Destination information not available yet."
            );

            return;

        }


        closeModal(searchModal);


        if (infoModalTitle) {

            infoModalTitle.textContent =
                destination.name;

        }


        if (infoModalBody) {

            infoModalBody.innerHTML = `

                <div class="destination-info">

                    <div class="destination-info-icon">

                        <i class="fa-solid ${getCategoryIcon(destination.category)}"></i>

                    </div>


                    <div>

                        <span class="modal-kicker">

                            ${escapeHTML(
                                destination.state || "INDIA"
                            )}

                        </span>


                        <h3>

                            ${escapeHTML(
                                destination.name
                            )}

                        </h3>


                        <p>

                            ${escapeHTML(
                                destination.description ||
                                "Discover this destination with HADOTIWALEBHAIYA."
                            )}

                        </p>


                        <button
                            type="button"
                            class="primary-button"
      