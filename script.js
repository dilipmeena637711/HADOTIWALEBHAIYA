/* =========================================================
   HADOTIWALEBHAIYA
   MAIN JAVASCRIPT
   Frontend Interaction System
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    const siteHeader =
        document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const headerSearchButton =
        document.getElementById("headerSearchButton");

    const loginButton =
        document.getElementById("loginButton");

    const heroSearch =
        document.getElementById("heroSearch");

    const exploreButton =
        document.getElementById("exploreButton");

    const heroAIButton =
        document.getElementById("heroAIButton");

    const openAIPlanner =
        document.getElementById("openAIPlanner");

    const searchModal =
        document.getElementById("searchModal");

    const destinationSearch =
        document.getElementById("destinationSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const searchResults =
        document.getElementById("searchResults");

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
       DESTINATION DATABASE
    ===================================================== */

    const destinations = [

        {
            id: "bundi",
            name: "Bundi",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "heritage"],
            description:
                "The blue city of palaces, paintings and hidden stories.",
            icon: "fa-landmark"
        },

        {
            id: "jaipur",
            name: "Jaipur",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "heritage"],
            description:
                "Heritage, architecture and colour.",
            icon: "fa-landmark"
        },

        {
            id: "udaipur",
            name: "Udaipur",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Lakes, palaces and slow travel.",
            icon: "fa-water"
        },

        {
            id: "jaisalmer",
            name: "Jaisalmer",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Golden sands beneath endless skies.",
            icon: "fa-sun"
        },

        {
            id: "kota",
            name: "Kota",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Riverfronts, gardens and the gateway to Hadoti.",
            icon: "fa-city"
        },

        {
            id: "ranthambore",
            name: "Ranthambore",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Wild landscapes and famous tiger habitat.",
            icon: "fa-paw"
        },

        {
            id: "mount-abu",
            name: "Mount Abu",
            state: "Rajasthan",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Rajasthan's famous hill destination.",
            icon: "fa-mountain-sun"
        },

        {
            id: "delhi",
            name: "Delhi",
            state: "Delhi",
            country: "India",
            category: ["destination", "heritage"],
            description:
                "Historic landmarks, culture and modern India.",
            icon: "fa-city"
        },

        {
            id: "agra",
            name: "Agra",
            state: "Uttar Pradesh",
            country: "India",
            category: ["destination", "heritage"],
            description:
                "Historic city famous for the Taj Mahal.",
            icon: "fa-building-columns"
        },

        {
            id: "goa",
            name: "Goa",
            state: "Goa",
            country: "India",
            category: ["destination", "nature"],
            description:
                "Beaches, coastal landscapes and relaxed travel.",
            icon: "fa-umbrella-beach"
        }

    ];


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message, type = "success") {

        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;

        const icon =
            toast.querySelector(".toast-icon i");

        if (icon) {

            icon.className =
                type === "error"
                    ? "fa-solid fa-circle-exclamation"
                    : "fa-solid fa-circle-check";

        }

        toast.classList.add("show");

        clearTimeout(window.hadotiToastTimer);

        window.hadotiToastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3000);

    }


    /* =====================================================
       MODAL SYSTEM
    ===================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("active");

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

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    function closeAllModals() {

        document
            .querySelectorAll(".modal-overlay")
            .forEach(modal => {

                modal.classList.remove("active");

                modal.setAttribute(
                    "aria-hidden",
                    "true"
                );

            });

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    function hideLoader() {

        if (!pageLoader) return;

        pageLoader.classList.add("hidden");

        setTimeout(() => {

            pageLoader.style.display = "none";

        }, 700);

    }


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                hideLoader,
                500
            );

        }
    );


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

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

        if (!mobileMenu ||
            !mobileMenuButton) return;

        mobileMenu.classList.add(
            "active"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        mobileMenuButton.classList.add(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        if (!mobileMenu ||
            !mobileMenuButton) return;

        mobileMenu.classList.remove(
            "active"
        );

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


    document
        .querySelectorAll(".mobile-nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


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
       SEARCH ENGINE
    ===================================================== */

    let activeCategory = "all";


    function renderSearchResults(
        query = "",
        category = activeCategory
    ) {

        if (!searchResults) return;

        const searchText =
            query.trim().toLowerCase();


        const filtered =
            destinations.filter(item => {

                const matchesText =
                    !searchText ||

                    item.name
                        .toLowerCase()
                        .includes(searchText) ||

                    item.state
                        .toLowerCase()
                        .includes(searchText) ||

                    item.country
                        .toLowerCase()
                        .includes(searchText) ||

                    item.description
                        .toLowerCase()
                        .includes(searchText);


                const matchesCategory =
                    category === "all" ||
                    item.category.includes(
                        category
                    );


                return (
                    matchesText &&
                    matchesCategory
                );

            });


        if (
            !searchText &&
            category === "all"
        ) {

            searchResults.innerHTML = `

                <div class="search-empty">

                    <i class="fa-solid fa-compass"></i>

                    <p>
                        Start typing to discover places.
                    </p>

                </div>

            `;

            return;

        }


        if (filtered.length === 0) {

            searchResults.innerHTML = `

                <div class="search-empty">

                    <i class="fa-solid fa-location-question"></i>

                    <p>
                        No destinations found.
                    </p>

                    <small>
                        Try another city or destination.
                    </small>

                </div>

            `;

            return;

        }


        searchResults.innerHTML =
            filtered.map(item => `

                <button
                    type="button"
                    class="search-result-item"
                    data-result="${item.id}"
                >

                    <span class="search-result-icon">

                        <i class="fa-solid ${item.icon}"></i>

                    </span>


                    <span class="search-result-content">

                        <strong>
                            ${item.name}
                        </strong>

                        <small>
                            ${item.state} • ${item.country}
                        </small>

                        <p>
                            ${item.description}
                        </p>

                    </span>


                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            `).join("");


        document
            .querySelectorAll("[data-result]")
            .forEach(result => {

                result.addEventListener(
                    "click",
                    () => {

                        const id =
                            result.dataset.result;

                        closeModal(
                            searchModal
                        );

                        openDestination(id);

                    }
                );

            });

    }


    if (destinationSearch) {

        destinationSearch.addEventListener(
            "input",
            event => {

                renderSearchResults(
                    event.target.value,
                    activeCategory
                );

            }
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                destinationSearch.value = "";

                destinationSearch.focus();

                renderSearchResults(
                    "",
                    activeCategory
                );

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


                    activeCategory =
                        button.dataset.category;


                    renderSearchResults(
                        destinationSearch
                            ? destinationSearch.value
                            : "",
                        activeCategory
                    );

                }
            );

        });


    /* =====================================================
       DESTINATION OPEN
    ===================================================== */

    function openDestination(id) {

        const destination =
            destinations.find(
                item => item.id === id
            );


        if (!destination) return;


        const card =
            document.querySelector(
                `[data-destination="${id}"]`
            );


        if (card) {

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


            card.classList.add(
                "destination-highlight"
            );


            setTimeout(() => {

                card.classList.remove(
                    "destination-highlight"
                );

            }, 1800);

        } else {

            document
                .getElementById("destinations")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }


        showToast(
            `${destination.name} selected`
        );

    }


    document
        .querySelectorAll(".destination-card")
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


                    openDestination(
                        card.dataset.destination
                    );

                }
            );

        });


    /* =====================================================
       FAVOURITES
    ===================================================== */

    let savedDestinations = [];


    try {

        savedDestinations =
            JSON.parse(
                localStorage.getItem(
                    "hadotiSavedDestinations"
                )
            ) || [];

    } catch {

        savedDestinations = [];

    }


    function updateSaveButton(
        button,
        saved
    ) {

        const icon =
            button.querySelector("i");


        if (!icon) return;


        if (saved) {

            icon.className =
                "fa-solid fa-heart";

            button.classList.add(
                "saved"
            );

        } else {

            icon.className =
                "fa-regular fa-heart";

            button.classList.remove(
                "saved"
            );

        }

    }


    document
        .querySelectorAll("[data-save]")
        .forEach(button => {

            const id =
                button.dataset.save;


            updateSaveButton(
                button,
                savedDestinations.includes(id)
            );


            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const index =
                        savedDestinations.indexOf(
                            id
                        );


                    if (index === -1) {

                        savedDestinations.push(
                            id
                        );


         