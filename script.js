/* =========================================================
   HADOTI WALE BHAIYA
   COMPLETE WORKING FRONTEND SCRIPT
   Search + Destinations + Map + Budget + Hotel
   + AI Planner + Login Demo + Theme + Route
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const API_BASE_URL =
  "https://hadotiwalebhaiya.onrender.com";

/* =========================================================
   LOCAL DESTINATIONS
   Database बंद हो तब भी SEARCH काम करेगा
========================================================= */

let destinations = [
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "12K",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description:
      "The Pink City of Rajasthan, famous for forts, palaces, markets and royal culture."
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
      "The City of Lakes, famous for beautiful palaces and lakes."
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
      "The Golden City of Rajasthan with desert adventures and forts."
  },

  {
    id: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    rating: "4.8",
    reviews: "8K",
    image:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=900&q=80",
    description:
      "The Blue City, home of Mehrangarh Fort and royal heritage."
  },

  {
    id: "mount-abu",
    name: "Mount Abu",
    state: "Rajasthan",
    rating: "4.7",
    reviews: "6K",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80",
    description:
      "Rajasthan's beautiful hill station."
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
      "A historic Hadoti destination famous for palace, fort and stepwells."
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
      "A beautiful Himalayan destination for mountains and adventure."
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
      "One of India's oldest cities, famous for ghats and spiritual culture."
  },

  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    rating: "4.7",
    reviews: "20K",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    description:
      "Beautiful beaches, nightlife and Portuguese heritage."
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
      "God's Own Country, famous for backwaters and greenery."
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
      "High-altitude Himalayan destination with spectacular landscapes."
  }
];

/* =========================================================
   HELPERS
========================================================= */

function cleanText(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function safe(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   DOM REFERENCES
========================================================= */

let searchForm;
let destinationInput;
let destinationCards;
let modal;
let modalContent;

/* =========================================================
   INITIAL DOM SETUP
========================================================= */

function getElements() {
  searchForm =
    document.getElementById("searchForm");

  destinationInput =
    document.getElementById("destinationInput");

  destinationCards =
    document.getElementById("destinationCards");

  modal =
    document.getElementById("modal");

  modalContent =
    document.getElementById("modalContent");
}

/* =========================================================
   RENDER DESTINATIONS
========================================================= */

function renderDestinations(list) {

  if (!destinationCards) {
    destinationCards =
      document.getElementById(
        "destinationCards"
      );
  }

  if (!destinationCards) {
    console.error(
      "destinationCards not found"
    );
    return;
  }

  if (!list || list.length === 0) {

    destinationCards.innerHTML = `
      <div style="
        grid-column:1/-1;
        width:100%;
        padding:40px 20px;
        text-align:center;
      ">

        <div style="font-size:50px;">
          🔎
        </div>

        <h3>
          No destination found
        </h3>

        <p>
          Try Jaipur, Udaipur, Rajasthan,
          Manali or Goa.
        </p>

      </div>
    `;

    return;
  }

  destinationCards.innerHTML = "";

  list.forEach(function(place) {

    const card =
      document.createElement("div");

    card.className = "destination";

    card.style.cursor = "pointer";

    card.innerHTML = `
      <img
        src="${safe(place.image)}"
        alt="${safe(place.name)}"
        loading="lazy"
        onerror="
          this.src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
        "
      >

      <div class="destination-info">

        <b>
          ${safe(place.name)}
        </b>

        <small>
          ${safe(place.state)}
        </small>

        <small>
          ⭐ ${safe(place.rating)}
          (${safe(place.reviews)})
        </small>

      </div>
    `;

    card.addEventListener(
      "click",
      function() {
        showDestination(place);
      }
    );

    destinationCards.appendChild(card);

  });
}

/* =========================================================
   SEARCH
========================================================= */

function searchDestinations(query) {

  const text =
    cleanText(query);

  if (!text) {
    renderDestinations(
      destinations
    );

    return;
  }

  const results =
    destinations.filter(
      function(place) {

        const name =
          cleanText(place.name);

        const state =
          cleanText(place.state);

        const description =
          cleanText(
            place.description
          );

        return (
          name.includes(text) ||
          state.includes(text) ||
          description.includes(text)
        );

      }
    );

  console.log(
    "SEARCH:",
    text,
    "RESULTS:",
    results
  );

  renderDestinations(
    results
  );

  const places =
    document.getElementById(
      "places"
    );

  if (places) {
    places.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* =========================================================
   SEARCH SYSTEM
========================================================= */

function setupSearch() {

  getElements();

  if (!destinationInput) {
    console.error(
      "destinationInput not found"
    );
    return;
  }

  /*
    FORM SUBMIT
  */

  if (searchForm) {

    searchForm.addEventListener(
      "submit",
      function(event) {

        event.preventDefault();

        searchDestinations(
          destinationInput.value
        );

      }
    );

  }

  /*
    ENTER KEY
  */

  destinationInput.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Enter"
      ) {

        event.preventDefault();

        searchDestinations(
          destinationInput.value
        );

      }

    }
  );

  /*
    LIVE SEARCH
  */

  destinationInput.addEventListener(
    "input",
    function() {

      searchDestinations(
        this.value
      );

    }
  );

  /*
    POPULAR SEARCH BUTTONS
  */

  document
    .querySelectorAll(
      "[data-place]"
    )
    .forEach(
      function(button) {

        button.addEventListener(
          "click",
          function() {

            const place =
              this.getAttribute(
                "data-place"
              );

            destinationInput.value =
              place;

            searchDestinations(
              place
            );

          }
        );

      }
    );

}

/* =========================================================
   MODAL
========================================================= */

function openModal(html) {

  if (!modal) {
    modal =
      document.getElementById(
        "modal"
      );
  }

  if (!modalContent) {
    modalContent =
      document.getElementById(
        "modalContent"
      );
  }

  if (
    !modal ||
    !modalContent
  ) {
    console.error(
      "Modal elements not found"
    );
    return;
  }

  modalContent.innerHTML =
    html;

  modal.style.display =
    "flex";

  modal.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";
}

function closeModal() {

  if (!modal) return;

  modal.style.display =
    "none";

  modal.classList.remove(
    "active"
  );

  document.body.style.overflow =
    "";
}

/* =========================================================
   MODAL SETUP
========================================================= */

function setupModal() {

  getElements();

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

  if (modal) {

    modal.addEventListener(
      "click",
      function(event) {

        if (
          event.target === modal
        ) {
          closeModal();
        }

      }
    );

  }

}

/* =========================================================
   DESTINATION DETAILS
========================================================= */

function showDestination(place) {

  openModal(`

    <div style="
      background:#fff;
      color:#111;
      border-radius:20px;
      overflow:hidden;
    ">

      <img
        src="${safe(place.image)}"
        alt="${safe(place.name)}"
        style="
          width:100%;
          height:260px;
          object-fit:cover;
        "
      >

      <div style="
        padding:24px;
      ">

        <h2>
          ${safe(place.name)}
        </h2>

        <p>
          📍 ${safe(place.state)}
        </p>

        <p>
          ⭐ ${safe(place.rating)}
          ·
          ${safe(place.reviews)}
          reviews
        </p>

        <p style="
          line-height:1.7;
        ">
          ${safe(
            place.description
          )}
        </p>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:20px;
        ">

          <button
            id="destinationMapBtn"
            type="button"
            style="
              padding:12px 18px;
              border:0;
              border-radius:10px;
              cursor:pointer;
            "
          >
            📍 Open Map
          </button>

          <button
            id="destinationBudgetBtn"
            type="button"
            style="
              padding:12px 18px;
              border:0;
              border-radius:10px;
              cursor:pointer;
            "
          >
            💰 Budget
          </button>

          <button
            id="destinationCloseBtn"
            type="button"
            style="
              padding:12px 18px;
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

  document
    .getElementById(
      "destinationMapBtn"
    )
    ?.addEventListener(
      "click",
      function() {
        openGoogleMaps(
          place.name
        );
      }
    );

  document
    .getElementById(
      "destinationBudgetBtn"
    )
    ?.addEventListener(
      "click",
      function() {
        openBudgetCalculator(
          place.name
        );
      }
    );

  document
    .getElementById(
      "destinationCloseBtn"
    )
    ?.addEventListener(
      "click",
      closeModal
    );

}

/* =========================================================
   GOOGLE MAP
========================================================= */

function openGoogleMaps(
  place
) {

  const query =
    encodeURIComponent(
      place
    );

  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    query;

  window.open(
    url,
    "_blank"
  );
}

/* =========================================================
   EXPLORE MAP
========================================================= */

function openExploreMap() {

  const buttons =
    destinations
      .slice(0, 15)
      .map(
        function(place) {

          return `
            <button
              class="map-destination"
              data-map="${safe(place.name)}"
              type="button"
              style="
                padding:14px;
                border:0;
                border-radius:10px;
                cursor:pointer;
                text-align:left;
              "
            >
              📍 ${safe(place.name)}
            </button>
          `;

        }
      )
      .join("");

  openModal(`

    <div style="
      background:#07111f;
      color:white;
      padding:25px;
      border-radius:20px;
    ">

      <h2>
        🗺️ Explore Map
      </h2>

      <p>
        Select a destination.
      </p>

      <div style="
        display:grid;
        gap:10px;
        margin-top:20px;
      ">
        ${buttons}
      </div>

    </div>

  `);

  document
    .querySelectorAll(
      ".map-destination"
    )
    .forEach(
      function(button) {

        button.addEventListener(
          "click",
          function() {

            openGoogleMaps(
              this.getAttribute(
                "data-map"
              )
            );

          }
        );

      }
    );

}

/* =========================================================
   BUDGET CALCULATOR
========================================================= */

function openBudgetCalculator(
  destinationName
) {

  openModal(`

    <div style="
      background:#fff;
      color:#111;
      padding:25px;
      border-radius:20px;
    ">

      <h2>
        💰 Budget Calculator
      </h2>

      ${
        destinationName
          ? `
            <p>
              Destination:
              <strong>
                ${safe(destinationName)}
              </strong>
            </p>
          `
          : ""
      }

      <label>
        Travelers
      </label>

      <input
        id="budgetPeople"
        type="number"
        min="1"
        value="2"
        style="
          width:100%;
          box-sizing:border-box;
          padding:12px;
          margin:8px 0 15px;
        "
      >

      <label>
        Days
      </label>

      <input
        id="budgetDays"
        type="number"
        min="1"
        value="3"
        style="
          width:100%;
          box-sizing:border-box;
          padding:12px;
          margin:8px 0 15px;
        "
      >

      <label>
        Daily cost per person
      </label>

      <input
        id="budgetDaily"
        type="number"
        min="0"
        value="2000"
        style="
          width:100%;
          box-sizing:border-box;
          padding:12px;
          margin:8px 0 15px;
        "
      >

      <button
        id="calculateBudgetBtn"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
        "
      >
        Calculate Budget
      </button>

      <div
        id="budgetResult"
        style="
          margin-top:20px;
          font-size:20px;
        "
      ></div>

    </div>

  `);

  document
    .getElementById(
      "calculateBudgetBtn"
    )
    ?.addEventListener(
      "click",
      calculateBudget
    );

}

/* =========================================================
   CALCULATE BUDGET
========================================================= */

function calculateBudget() {

  const people =
    Number(
      document.getElementById(
        "budgetPeople"
      )?.value
    ) || 1;

  const days =
    Number(
      document.getElementById(
        "budgetDays"
      )?.value
    ) || 1;

  const daily =
    Number(
      document.getElementById(
        "budgetDaily"
      )?.value
    ) || 0;

  const total =
    people *
    days *
    daily;

  const result =
    document.getElementById(
      "budgetResult"
    );

  if (result) {

    result.innerHTML = `
      Estimated Trip Cost:
      <strong>
        ₹${total.toLocaleString(
          "en-IN"
        )}
      </strong>
    `;

  }

}

/* =========================================================
   HOTEL BOOKING
========================================================= */

function openHotelBooking() {

  const options =
    destinations
      .map(
        function(place) {

          return `
            <option>
              ${safe(place.name)}
            </option>
          `;

        }
      )
      .join("");

  openModal(`

    <div style="
      background:#fff;
      color:#111;
      padding:25px;
      border-radius:20px;
    ">

      <h2>
        🏨 Hotel & Hostel Booking
      </h2>

      <label>
        Destination
      </label>

      <select
        id="hotelDestination"
        style="
          width:100%;
          padding:12px;
          margin:8px 0 15px;
        "
      >
        ${options}
      </select>

      <label>
        Check-in
      </label>

      <input
        id="hotelDate"
        type="date"
        style="
          width:100%;
          box-sizing:border-box;
          padding:12px;
          margin:8px 0 15px;
        "
      >

      <button
        id="hotelSearchBtn"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
        "
      >
        Search Stays
      </button>

      <div
        id="hotelResult"
        style="
          margin-top:20px;
        "
      ></div>

    </div>

  `);

  document
    .getElementById(
      "hotelSearchBtn"
    )
    ?.addEventListener(
      "click",
      searchHotels
    );

}

/* ================================================