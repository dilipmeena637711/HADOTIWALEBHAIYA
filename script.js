/* =========================================================
   HADOTI WALE BHAIYA
   MASTER FRONTEND JAVASCRIPT
   STABLE VERSION
   Search + Database + Destinations + Services
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL = "https://hadotiwalebhaiya.onrender.com";

/* =========================================================
   LOCAL FALLBACK DESTINATIONS
   Database unavailable होने पर भी ये काम करेंगे
========================================================= */

const LOCAL_DESTINATIONS = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "12K",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description:
      "The Pink City of India, famous for forts, palaces, markets and royal culture."
  },

  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    rating: "4.8",
    reviews: "9K",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=900&q=80",
    description:
      "The City of Lakes, known for beautiful palaces, lakes and romantic views."
  },

  {
    id: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "7K",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    description:
      "The Golden City of Rajasthan, famous for its fort and desert adventures."
  },

  {
    id: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    rating: "4.8",
    reviews: "8K",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    description:
      "The Blue City, home to Mehrangarh Fort and colourful old streets."
  },

  {
    id: "mount-abu",
    name: "Mount Abu",
    state: "Rajasthan",
    rating: "4.7",
    reviews: "5K",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=80",
    description:
      "A beautiful hill station in Rajasthan with lakes, hills and temples."
  },

  {
    id: "kota",
    name: "Kota",
    state: "Rajasthan",
    rating: "4.6",
    reviews: "4K",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    description:
      "A major city of Hadoti known for Chambal River, gardens and education."
  },

  {
    id: "bundi",
    name: "Bundi",
    state: "Rajasthan",
    rating: "4.7",
    reviews: "3K",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80",
    description:
      "A historic Hadoti destination famous for its palace, fort and stepwells."
  },

  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    rating: "4.8",
    reviews: "15K",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    description:
      "A popular Himalayan destination surrounded by mountains, rivers and forests."
  },

  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    rating: "4.8",
    reviews: "11K",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",
    description:
      "An ancient spiritual city famous for the Ganga ghats and culture."
  },

  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    rating: "4.8",
    reviews: "20K",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    description:
      "A popular beach destination known for beaches, food, culture and nightlife."
  },

  {
    id: "kerala",
    name: "Kerala",
    state: "Kerala",
    rating: "4.8",
    reviews: "14K",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    description:
      "God's Own Country, famous for backwaters, beaches, hills and nature."
  },

  {
    id: "leh-ladakh",
    name: "Leh Ladakh",
    state: "Ladakh",
    rating: "4.9",
    reviews: "8K",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    description:
      "A spectacular Himalayan region famous for mountains, monasteries and road trips."
  }
];

/* =========================================================
   GLOBAL DATA
========================================================= */

let destinations = [...LOCAL_DESTINATIONS];

let destinationCards = null;
let searchForm = null;
let destinationInput = null;
let modal = null;
let modalContent = null;

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function escapeAttribute(value) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

/* =========================================================
   DATABASE
========================================================= */

async function loadDestinationsFromDatabase() {
  try {
    console.log("Connecting to HADOTI WALE BHAIYA database...");

    const response = await fetch(
      `${API_BASE_URL}/api/destinations`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    console.log("DATABASE RESPONSE:", result);

    let databaseData = [];

    if (Array.isArray(result)) {
      databaseData = result;
    } else if (Array.isArray(result.data)) {
      databaseData = result.data;
    } else if (Array.isArray(result.destinations)) {
      databaseData = result.destinations;
    }

    if (databaseData.length > 0) {
      const formattedDatabaseData = databaseData.map(
        (place, index) => ({
          id:
            place.id ||
            place.slug ||
            `database-${index}`,

          name:
            place.name ||
            place.title ||
            place.destination ||
            "Unknown Destination",

          state:
            place.state ||
            place.location ||
            place.city ||
            "",

          rating:
            place.rating ||
            place.average_rating ||
            "0",

          reviews:
            place.reviews ||
            place.total_reviews ||
            "0",

          image:
            place.image ||
            place.image_url ||
            place.photo ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",

          description:
            place.description ||
            "Explore this beautiful destination with HADOTI WALE BHAIYA.",

          latitude:
            place.latitude ||
            place.lat ||
            null,

          longitude:
            place.longitude ||
            place.lng ||
            null
        })
      );

      /*
        IMPORTANT:
        Database data fallback ko replace nahi karega.
        Dono merge honge.
      */

      const combined = [
        ...LOCAL_DESTINATIONS,
        ...formattedDatabaseData
      ];

      const unique = [];

      const seen = new Set();

      combined.forEach((place) => {
        const key = normalizeText(place.name);

        if (!seen.has(key)) {
          seen.add(key);
          unique.push(place);
        }
      });

      destinations = unique;

      console.log(
        "Combined destinations:",
        destinations.length
      );
    } else {
      destinations = [...LOCAL_DESTINATIONS];

      console.log(
        "Database empty. Local destinations active."
      );
    }
  } catch (error) {
    console.warn(
      "Database unavailable. Using local destinations.",
      error
    );

    destinations = [...LOCAL_DESTINATIONS];
  }

  renderDestinations(destinations);
}

/* =========================================================
   DESTINATION CARDS
========================================================= */

function findDestinationContainer() {
  destinationCards =
    document.getElementById("destinationCards") ||
    document.querySelector(".destination-cards") ||
    document.querySelector(".destinations-grid") ||
    document.querySelector(".cards");

  return destinationCards;
}

function renderDestinations(list) {
  const container = findDestinationContainer();

  if (!container) {
    console.warn(
      "Destination cards container not found."
    );
    return;
  }

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = `
      <div style="
        padding:30px;
        text-align:center;
        width:100%;
      ">
        <h3>🔍 No destinations found</h3>
        <p>Try Jaipur, Rajasthan, Udaipur or Manali.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = "";

  list.forEach((place) => {
    const card = document.createElement("div");

    card.className = "destination-card";

    card.innerHTML = `
      <div class="destination-image">
        <img
          src="${escapeHTML(place.image)}"
          alt="${escapeHTML(place.name)}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'"
        >
      </div>

      <div class="destination-info">

        <h3>
          ${escapeHTML(place.name)}
        </h3>

        <p>
          ${escapeHTML(place.state || "")}
        </p>

        <div class="destination-rating">
          ⭐ ${escapeHTML(place.rating)}
          <span>
            (${escapeHTML(place.reviews)})
          </span>
        </div>

        <button
          class="destination-btn"
          type="button"
        >
          Explore
        </button>

      </div>
    `;

    const exploreButton =
      card.querySelector(".destination-btn");

    if (exploreButton) {
      exploreButton.addEventListener(
        "click",
        () => {
          showDestination(place);
        }
      );
    }

    container.appendChild(card);
  });
}

/* =========================================================
   SEARCH ENGINE
========================================================= */

function searchDestinations(query) {
  const cleanQuery = normalizeText(query);

  if (!cleanQuery) {
    return [...destinations];
  }

  return destinations.filter((place) => {
    const name = normalizeText(place.name);
    const state = normalizeText(place.state);
    const description = normalizeText(
      place.description
    );

    return (
      name.includes(cleanQuery) ||
      state.includes(cleanQuery) ||
      description.includes(cleanQuery)
    );
  });
}

function performSearch() {
  if (!destinationInput) {
    destinationInput =
      document.getElementById("destinationInput");
  }

  if (!destinationInput) return;

  const query = destinationInput.value.trim();

  if (!query) {
    renderDestinations(destinations);
    return;
  }

  const results = searchDestinations(query);

  console.log(
    `Search "${query}" results:`,
    results
  );

  renderDestinations(results);

  const placesSection =
    document.getElementById("places");

  if (placesSection) {
    placesSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function setupSearch() {
  searchForm =
    document.getElementById("searchForm");

  destinationInput =
    document.getElementById(
      "destinationInput"
    );

  if (!destinationInput) {
    console.warn(
      "destinationInput not found."
    );

    return;
  }

  /*
    Form submit
  */

  if (searchForm) {
    searchForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        performSearch();
      }
    );
  }

  /*
    Enter key
  */

  destinationInput.addEventListener(
    "keydown",
    function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        performSearch();
      }
    }
  );

  /*
    Live search
  */

  destinationInput.addEventListener(
    "input",
    function () {
      const query =
        this.value.trim();

      if (!query) {
        renderDestinations(
          destinations
        );

        return;
      }

      const results =
        searchDestinations(query);

      renderDestinations(results);
    }
  );

  /*
    Popular searches
  */

  const popularButtons =
    document.querySelectorAll(
      "[data-place]"
    );

  popularButtons.forEach(
    (button) => {
      button.addEventListener(
        "click",
        function () {
          const place =
            this.getAttribute(
              "data-place"
            );

          destinationInput.value =
            place;

          performSearch();
        }
      );
    }
  );

  console.log(
    "Search system ready."
  );
}

/* =========================================================
   MODAL
========================================================= */

function setupModal() {
  modal =
    document.getElementById("modal");

  if (!modal) {
    createModal();
    return;
  }

  modalContent =
    document.getElementById(
      "modalContent"
    );

  const closeButton =
    document.getElementById(
      "closeModal"
    );

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeModal
    );
  }

  modal.addEventListener(
    "click",
    function (event) {
      if (
        event.target === modal
      ) {
        closeModal();
      }
    }
  );
}

function createModal() {
  modal =
    document.createElement("div");

  modal.id = "hwDynamicModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    z-index:999999;
    display:none;
    align-items:center;
    justify-content:center;
    padding:20px;
    background:rgba(0,0,0,.78);
    overflow:auto;
  `;

  modal.innerHTML = `
    <div
      id="hwDynamicModalContent"
      style="
        width:100%;
        max-width:720px;
      "
    ></div>
  `;

  document.body.appendChild(
    modal
  );

  modalContent =
    document.getElementById(
      "hwDynamicModalContent"
    );

  modal.addEventListener(
    "click",
    function (event) {
      if (
        event.target === modal
      ) {
        closeModal();
      }
    }
  );
}

function ensureModal() {
  if (!modal) {
    setupModal();
  }

  if (!modalContent) {
    modalContent =
      document.getElementById(
        "modalContent"
      ) ||
      document.getElementById(
        "hwDynamicModalContent"
      );
  }
}

function openModal(html) {
  ensureModal();

  if (!modalContent) return;

  modalContent.innerHTML = html;

  modal.style.display = "flex";
}

function closeModal() {
  if (modal) {
    modal.style.display = "none";
  }
}

/* =========================================================
   DESTINATION DETAILS
========================================================= */

function showDestination(place) {
  if (!place) return;

  openModal(`
    <div style="
      background:#fff;
      color:#111;
      border-radius:22px;
      overflow:hidden;
      max-width:720px;
      margin:auto;
    ">

      <img
        src="${escapeHTML(place.image)}"
        alt="${escapeHTML(place.name)}"
        style="
          width:100%;
          height:280px;
          object-fit:cover;
        "
      >

      <div style="
        padding:25px;
      ">

        <h2>
          ${escapeHTML(place.name)}
        </h2>

        <p>
          📍 ${escapeHTML(place.state)}
        </p>

        <p>
          ⭐ ${escapeHTML(place.rating)}
          ·
          ${escapeHTML(place.reviews)}
          reviews
        </p>

        <p>
          ${escapeHTML(
            place.description ||
            "Explore this beautiful destination."
          )}
        </p>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin-top:20px;
        ">

          <button
            type="button"
            id="destinationMapButton"
            style="
              padding:13px 18px;
              border:0;
              border-radius:10px;
              cursor:pointer;
            "
          >
            📍 Open Map
          </button>

          <button
            type="button"
            id="destinationCloseButton"
            style="
              padding:13px 18px;
              border:0;
              border-radius:10px;
              cursor:pointer;
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  `);

  const mapButton =
    document.getElementById(
      "destinationMapButton"
    );

  if (mapButton) {
    mapButton.addEventListener(
      "click",
      function () {
        openGoogleMaps(
          place.name
        );
      }
    );
  }

  const closeButton =
    document.getElementById(
      "destinationCloseButton"
    );

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeModal
    );
  }
}

/* =========================================================
   GOOGLE MAPS
========================================================= */

function openGoogleMaps(placeName) {
  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(placeName);

  window.open(
    url,
    "_blank"
  );
}

/* =========================================================
   EXPLORE MAP
========================================================= */

function openExploreMap() {
  const mapList =
    destinations
      .slice(0, 12)
      .map(
        (place) => `
          <button
            type="button"
            class="hw-map-place"
            data-map-place="${escapeHTML(place.name)}"
            style="
              padding:14px;
              border:0;
              border-radius:12px;
              cursor:pointer;
              text-align:left;
            "
          >
            📍 ${escapeHTML(place.name)}
          </button>
        `
      )
      .join("");

  openModal(`
    <div style="
      background:#07111f;
      color:#fff;
      padding:28px;
      border-radius:22px;
    ">

      <h2>
        🗺️ Explore Map
      </h2>

      <p>
        Choose a destination.
      </p>

      <div style="
        display:grid;
        gap:10px;
        margin-top:20px;
      ">
        ${mapList}
      </div>

      <button
        type="button"
        id="mapCloseButton"
        style="
          margin-top:20px;
          padding:13px 20px;
          border:0;
          border-radius:10px;
          cursor:pointer;
        "
      >
        Close
      </button>

    </div>
  `);

  document
    .querySelectorAll(
      ".hw-map-place"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        function () {
          openGoogleMaps(
            this.getAttribute(
              "data-map-place"
            )
          );
        }
      );
    });

  const closeButton =
    document.getElementById(
      "mapCloseButton"
    );

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeModal
    );
  }
}

/* =========================================================
   BUDGET CALCULATOR
========================================================= */

function openBudgetCalculator() {
  openModal(`
    <div style="
      background:#fff;
      color:#111;
      padding:25px;
      border-radius:22px;
    "