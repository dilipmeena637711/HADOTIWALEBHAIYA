/*
=========================================================
HADOTI WALE BHAIYA
MAIN JAVASCRIPT
=========================================================
*/

"use strict";


/* =======================================================
   DOM READY
======================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeMobileMenu();
    initializeDestinations();
    initializeSearch();
    initializeButtons();
    initializeCurrentYear();

});


/* =======================================================
   MOBILE MENU
======================================================= */

function initializeMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (!menuBtn || !mobileNav) {
        return;
    }

    menuBtn.addEventListener("click", function () {

        const isOpen = mobileNav.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuBtn.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu after clicking a link */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileNav.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.textContent = "☰";

        });

    });

}


/* =======================================================
   DESTINATIONS
======================================================= */

function initializeDestinations() {

    const grid =
        document.getElementById("destinationGrid");

    if (!grid) {
        return;
    }

    const destinations =
        getDestinationData();

    renderDestinations(
        destinations,
        grid
    );

}


/* -------------------------------------------------------
   GET DESTINATION DATA
------------------------------------------------------- */

function getDestinationData() {

    if (
        Array.isArray(window.HADOTI_DESTINATIONS)
    ) {
        return window.HADOTI_DESTINATIONS;
    }

    return [];

}


/* -------------------------------------------------------
   RENDER DESTINATIONS
------------------------------------------------------- */

function renderDestinations(
    destinations,
    grid
) {

    if (!Array.isArray(destinations)) {
        showEmptyDestinations(grid);
        return;
    }


    if (destinations.length === 0) {
        showEmptyDestinations(grid);
        return;
    }


    /*
    First 12 cities are shown initially.
    More can be added later with pagination/load-more.
    */

    const visibleCities =
        destinations.slice(0, 12);


    grid.innerHTML =
        visibleCities
            .map(createDestinationCard)
            .join("");


    addDestinationInteractions(grid);

}


/* -------------------------------------------------------
   CREATE DESTINATION CARD
------------------------------------------------------- */

function createDestinationCard(city) {

    const id =
        escapeHTML(city.id || "");

    const name =
        escapeHTML(
            city.nameHi ||
            city.name ||
            "Unknown City"
        );

    const englishName =
        escapeHTML(
            city.name ||
            ""
        );

    const state =
        escapeHTML(
            city.state ||
            city.region ||
            "India"
        );

    const category =
        Array.isArray(city.category)
            ? city.category
                .slice(0, 2)
                .map(escapeHTML)
                .join(" • ")
            : escapeHTML(
                city.category ||
                "Travel"
            );

    const description =
        escapeHTML(
            city.description ||
            "इस शहर के बारे में जल्द और जानकारी उपलब्ध होगी।"
        );

    const emoji =
        escapeHTML(
            city.emoji ||
            "📍"
        );


    return `
        <article
            class="destination-card"
            data-city-id="${id}"
        >

            <div
                class="destination-image-placeholder"
                aria-hidden="true"
            >
                ${emoji}
            </div>

            <div class="destination-card-content">

                <span class="destination-category">
                    ${category}
                </span>

                <h3>
                    ${name}
                </h3>

                <p class="destination-english">
                    ${englishName}
                </p>

                <p>
                    ${description}
                </p>

                <small>
                    📍 ${state}
                </small>

            </div>

        </article>
    `;

}


/* -------------------------------------------------------
   DESTINATION INTERACTION
------------------------------------------------------- */

function addDestinationInteractions(grid) {

    const cards =
        grid.querySelectorAll(
            ".destination-card"
        );

    cards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const cityId =
                    card.dataset.cityId;

                const city =
                    getCityById(cityId);

                if (!city) {
                    return;
                }

                showCityMessage(city);

            }
        );

    });

}


/* -------------------------------------------------------
   FIND CITY
------------------------------------------------------- */

function getCityById(id) {

    if (
        typeof window.getDestinationById ===
        "function"
    ) {
        return window.getDestinationById(id);
    }


    const destinations =
        getDestinationData();

    return destinations.find(
        function (city) {
            return city.id === id;
        }
    ) || null;

}


/* -------------------------------------------------------
   CITY MESSAGE
------------------------------------------------------- */

function showCityMessage(city) {

    const cityName =
        city.nameHi ||
        city.name ||
        "City";

    /*
    Temporary interaction.
    Full city detail page/modal will be added later.
    */

    alert(
        "📍 " +
        cityName +
        "\n\n" +
        "इस destination का पूरा travel guide जल्द उपलब्ध होगा।"
    );

}


/* =======================================================
   SEARCH
======================================================= */

function initializeSearch() {

    const form =
        document.getElementById("searchForm");

    const input =
        document.getElementById("searchInput");

    const grid =
        document.getElementById("destinationGrid");


    if (!form || !input || !grid) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const query =
                input.value.trim();


            if (!query) {

                renderDestinations(
                    getDestinationData(),
                    grid
                );

                return;
            }


            const results =
                performSearch(query);


            renderSearchResults(
                results,
                grid
            );

        }
    );

}


/* -------------------------------------------------------
   PERFORM SEARCH
------------------------------------------------------- */

function performSearch(query) {

    if (
        typeof window.searchDestinations ===
        "function"
    ) {

        return window.searchDestinations(
            query
        );

    }


    const destinations =
        getDestinationData();

    const searchText =
        query.toLowerCase();


    return destinations.filter(
        function (city) {

            const searchableText = [

                city.name,
                city.nameHi,
                city.state,
                city.region,
                city.description,

                ...(Array.isArray(city.tags)
                    ? city.tags
                    : [])

            ]
                .join(" ")
                .toLowerCase();


            return searchableText.includes(
                searchText
            );

        }
    );

}


/* -------------------------------------------------------
   SEARCH RESULTS
------------------------------------------------------- */

function renderSearchResults(
    results,
    grid
) {

    if (
        !Array.isArray(results) ||
        results.length === 0
    ) {

        grid.innerHTML = `
            <div class="loading-card">
                <span>🔍</span>

                <p>
                    कोई destination नहीं मिला।
                </p>

                <small>
                    दूसरा शहर या जगह search करें।
                </small>
            </div>
        `;

        return;
    }


    grid.innerHTML =
        results
            .slice(0, 50)
            .map(createDestinationCard)
            .join("");


    addDestinationInteractions(grid);

}


/* =======================================================
   BUTTONS
======================================================= */

function initializeButtons() {

    const planBtn =
        document.getElementById(
            "planTripBtn"
        );

    const stayBtn =
        document.getElementById(
            "stayExploreBtn"
        );

    const languageBtn =
        document.getElementById(
            "languageBtn"
        );


    /* Plan Trip */

    if (planBtn) {

        planBtn.addEventListener(
            "click",
            function () {

                alert(
                    "🗺️ Trip Planner\n\n" +
                    "आपका AI Trip Planner जल्द यहाँ उपलब्ध होगा।"
                );

            }
        );

    }


    /* Stay */

    if (stayBtn) {

        stayBtn.addEventListener(
            "click",
            function () {

                alert(
                    "🏨 Hotels & Homestays\n\n" +
                    "Stay discovery feature जल्द उपलब्ध होगा।"
                );

            }
        );

    }


    /* Language */

    if (languageBtn) {

        languageBtn.addEventListener(
            "click",
            function () {

                alert(
                    "🌐 Language\n\n" +
                    "Hindi / English language system जल्द जोड़ा जाएगा।"
                );

            }
        );

    }

}


/* =======================================================
   CURRENT YEAR
======================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById(
            "currentYear"
        );

    if (!yearElement) {
        return;
    }

    yearElement.textContent =
        new Date().getFullYear();

}


/* =======================================================
   EMPTY DESTINATIONS
======================================================= */

function showEmptyDestinations(grid) {

    grid.innerHTML = `
        <div class="loading-card">

            <span>📍</span>

            <p>
                Destinations data उपलब्ध नहीं है।
            </p>

        </div>
    `;

}


/* =======================================================
   HTML ESCAPE
======================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}