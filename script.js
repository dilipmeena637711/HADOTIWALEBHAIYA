/* =========================================
   HADOTI WALE BHAIYA
   MASTER FRONTEND JAVASCRIPT
   Database-connected version
========================================= */

const API_BASE_URL = "https://hadotiwalebhaiya.onrender.com";

/* =========================================
   FALLBACK DESTINATIONS
========================================= */

let destinations = [
  {
    name: "Jaipur",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "12K",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Udaipur",
    state: "Rajasthan",
    rating: "4.8",
    reviews: "9K",
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Jaisalmer",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "7K",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    rating: "4.8",
    reviews: "15K",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    rating: "4.8",
    reviews: "11K",
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Leh Ladakh",
    state: "Ladakh",
    rating: "4.9",
    reviews: "8K",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
  }
];

/* =========================================
   DOM ELEMENTS
========================================= */

let destinationCards;
let searchForm;
let destinationInput;
let modal;
let modalContent;

/* =========================================
   LOAD DESTINATIONS FROM DATABASE
========================================= */

async function loadDestinationsFromDatabase() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/destinations`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    console.log("DATABASE RESPONSE:", result);

    const data = Array.isArray(result)
      ? result
      : result.data || result.destinations || [];

    if (Array.isArray(data) && data.length > 0) {
      destinations = data.map((place) => ({
        id: place.id,
        name: place.name || place.title || "Unknown",
        state: place.state || place.location || "",
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
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        latitude:
          place.latitude ||
          place.lat ||
          null,
        longitude:
          place.longitude ||
          place.lng ||
          null,
        description:
          place.description ||
          "Beautiful destination to explore."
      }));

      console.log(
        "DATABASE DESTINATIONS LOADED:",
        destinations
      );
    } else {
      console.log(
        "No database destinations found. Using fallback data."
      );
    }

  } catch (error) {
    console.error(
      "DATABASE CONNECTION ERROR:",
      error
    );
  }

  loadDestinations();
}

/* =========================================
   DESTINATION CARDS
========================================= */

function loadDestinations(list = destinations) {

  destinationCards =
    document.querySelector(
      "#destinationCards"
    ) ||
    document.querySelector(
      ".destination-cards"
    ) ||
    document.querySelector(
      ".destinations-grid"
    );

  if (!destinationCards) {
    console.warn(
      "Destination cards container not found."
    );
    return;
  }

  if (!list || list.length === 0) {
    destinationCards.innerHTML = `
      <div style="padding:30px;text-align:center;">
        No destinations available.
      </div>
    `;
    return;
  }

  destinationCards.innerHTML = "";

  list.forEach((place, index) => {

    const card = document.createElement("div");

    card.className =
      "destination-card";

    card.innerHTML = `
      <div class="destination-image">
        <img
          src="${place.image}"
          alt="${escapeHTML(place.name)}"
          loading="lazy"
        >
      </div>

      <div class="destination-info">

        <h3>
          ${escapeHTML(place.name)}
        </h3>

        <p>
          ${escapeHTML(place.state)}
        </p>

        <div class="destination-rating">
          ⭐ ${escapeHTML(String(place.rating))}
          <span>
            (${escapeHTML(String(place.reviews))})
          </span>
        </div>

        <button
          class="destination-btn"
          data-index="${index}"
        >
          Explore
        </button>

      </div>
    `;

    destinationCards.appendChild(card);
  });

  destinationCards
    .querySelectorAll(".destination-btn")
    .forEach((button) => {

      button.addEventListener(
        "click",
        function () {

          const index =
            Number(
              this.dataset.index
            );

          showDestination(
            list[index]
          );
        }
      );
    });
}

/* =========================================
   DESTINATION MODAL
========================================= */

function showDestination(place) {

  if (!place) return;

  createModalIfNeeded();

  modalContent.innerHTML = `
    <div style="
      max-width:700px;
      margin:auto;
      background:#fff;
      border-radius:20px;
      overflow:hidden;
      color:#111;
    ">

      <img
        src="${place.image}"
        alt="${escapeHTML(place.name)}"
        style="
          width:100%;
          height:280px;
          object-fit:cover;
        "
      >

      <div style="padding:25px;">

        <h2>
          ${escapeHTML(place.name)}
        </h2>

        <p>
          ${escapeHTML(place.state || "")}
        </p>

        <p>
          ⭐ ${escapeHTML(String(place.rating || "0"))}
          ·
          ${escapeHTML(String(place.reviews || "0"))}
          reviews
        </p>

        <p>
          ${escapeHTML(
            place.description ||
            "Explore this beautiful destination with HADOTI WALE BHAIYA."
          )}
        </p>

        <div style="
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-top:20px;
        ">

          <button
            onclick="openGoogleMaps('${escapeAttribute(place.name)}')"
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
            onclick="closeModal()"
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
  `;

  modal.style.display = "flex";
}

/* =========================================
   MODAL
========================================= */

function createModalIfNeeded() {

  modal =
    document.getElementById(
      "hwModal"
    );

  if (modal) {
    modalContent =
      modal.querySelector(
        ".hw-modal-content"
      );
    return;
  }

  modal =
    document.createElement("div");

  modal.id = "hwModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    z-index:99999;
    display:none;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.75);
    padding:20px;
    overflow:auto;
  `;

  modal.innerHTML = `
    <div
      class="hw-modal-content"
      style="
        width:100%;
        max-width:720px;
      "
    ></div>
  `;

  document.body.appendChild(modal);

  modalContent =
    modal.querySelector(
      ".hw-modal-content"
    );

  modal.addEventListener(
    "click",
    function(event) {

      if (event.target === modal) {
        closeModal();
      }

    }
  );
}

function closeModal() {

  if (modal) {
    modal.style.display = "none";
  }
}

/* =========================================
   GOOGLE MAPS
========================================= */

function openGoogleMaps(placeName) {

  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(placeName);

  window.open(
    url,
    "_blank"
  );
}

/* =========================================
   SEARCH
========================================= */

function setupSearch() {

  searchForm =
    document.querySelector(
      "#searchForm"
    ) ||
    document.querySelector(
      ".search-form"
    );

  destinationInput =
    document.querySelector(
      "#destinationInput"
    ) ||
    document.querySelector(
      "#searchInput"
    ) ||
    document.querySelector(
      ".destination-input"
    );

  if (!destinationInput) {
    console.warn(
      "Search input not found."
    );
    return;
  }

  destinationInput.addEventListener(
    "input",
    function () {

      const query =
        this.value
          .trim()
          .toLowerCase();

      if (!query) {
        loadDestinations();
        return;
      }

      const filtered =
        destinations.filter(
          (place) =>
            String(place.name)
              .toLowerCase()
              .includes(query) ||

            String(place.state)
              .toLowerCase()
              .includes(query)
        );

      loadDestinations(
        filtered
      );
    }
  );

  if (searchForm) {

    searchForm.addEventListener(
      "submit",
      function(event) {

        event.preventDefault();

        const query =
          destinationInput.value
            .trim()
            .toLowerCase();

        const filtered =
          destinations.filter(
            (place) =>
              String(place.name)
                .toLowerCase()
                .includes(query) ||

              String(place.state)
                .toLowerCase()
                .includes(query)
          );

        loadDestinations(
          filtered
        );
      }
    );
  }
}

/* =========================================
   EXPLORE MAP
========================================= */

function setupExploreMap() {

  const mapButtons =
    document.querySelectorAll(
      "[data-service='map'], #exploreMap, .explore-map"
    );

  mapButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        function(event) {

          event.preventDefault();

          createModalIfNeeded();

          modalContent.innerHTML = `
            <div style="
              background:#07111f;
              color:white;
              padding:30px;
              border-radius:20px;
              text-align:center;
            ">

              <h2>🗺️ Explore Map</h2>

              <p>
                Choose a destination to
                open its location in Google Maps.
              </p>

              <div style="
                display:grid;
                gap:10px;
                margin-top:20px;
              ">

                ${destinations
                  .slice(0, 10)
                  .map(
                    (place) => `
                      <button
                        onclick="openGoogleMaps('${escapeAttribute(place.name)}')"
                        style="
                          padding:14px;
                          border:0;
                          border-radius:10px;
                          cursor:pointer;
                        "
                      >
                        📍 ${escapeHTML(place.name)}
                      </button>
                    `
                  )
                  .join("")}

              </div>

              <button
                onclick="closeModal()"
                style="
                  margin-top:20px;
                  padding:12px 20px;
                  border:0;
                  border-radius:10px;
                "
              >
                Close
              </button>

            </div>
          `;

          modal.style.display =
            "flex";
        }
      );

    }
  );
}

/* =========================================
   BUDGET CALCULATOR
========================================= */

function setupBudgetCalculator() {

  const buttons =
    document.querySelectorAll(
      "[data-service='calculator'], #budgetCalculator, .budget-calculator"
    );

  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        function(event) {

          event.preventDefault();

          createModalIfNeeded();

          modalContent.innerHTML = `
            <div style="
              background:white;
              padding:25px;
              border-radius:20px;
              color:#111;
            ">

              <h2>💰 Budget Calculator</h2>

              <label>
                People
              </label>

              <input
                id="budgetPeople"
                type="number"
                value="2"
                min="1"
                style="
                  width:100%;
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
                value="3"
                min="1"
                style="
                  width:100%;
                  padding:12px;
                  margin:8px 0 15px;
                "
              >

              <label>
                Daily budget per person
              </label>

              <input
                id="budgetDaily"
                type="number"
                value="2000"
                min="0"
                style="
                  width:100%;
                  padding:12px;
                  margin:8px 0 15px;
                "
              >

              <button
                onclick="calculateBudget()"
                style="
                  width:100%;
                  padding:14px;
                  border:0;
                  border-radius:10px;
                  cursor:pointer;
                "
              >
                Calculate
              </button>

              <div
                id="budgetResult"
                style="
                  margin-top:20px;
                  font-size:20px;
                  font-weight:bold;
                "
              ></div>

              <button
                onclick="closeModal()"
                style="
                  margin-top:15px;
                  padding:12px 18px;
                  border:0;
                  border-radius:10px;
                "
              >
                Close
              </button>

            </div>
          `;

          modal.style.display =
            "flex";
        }
      );

    }
  );
}

function calculateBudget() {

  const people =
    Number(
      document.getElementById(
        "budgetPeople"
      ).value
    ) || 1;

  const days =
    Number(
      document.getElementById(
        "budgetDays"
      ).value
    ) || 1;

  const daily =
    Number(
      document.getElementById(
        "budgetDaily"
      ).value
    ) || 0;

  const total =
    people *
    days *
    daily;

  const result =
    document.getElementById(
      "budgetResult"
    );

  result.textContent =
    `Estimated Budget: ₹${total.toLocaleString("en-IN")}`;
}

/* =========================================
   HOSTEL BOOKING
========================================= */

function setupHostelBooking() {

  const buttons =
    document.querySelectorAll(
      "[data-service='hostel'], #hostelBooking, .hostel-booking"
    );

  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        function(event) {

          event.preventDefault();

          createModalIfNeeded();

          modalContent.innerHTML = `
            <div style="
              background:white;
              color:#111;
              padding:25px;
              border-radius:20px;
            ">

              <h2>🏨 Hostel Booking</h2>

              <p>
                Select your destination.
              </p>

              <select
                id="hostelDestination"
                style="
                  width:100%;
                  padding:12px;
                  margin:10px 0;
                "
              >

                ${destinations
                  .map(
                    (place) =>
                      `<option>
                        ${escapeHTML(place.name)}
                      </option>`
                  )
                  .join("")}

              </select>

              <input
                id="hostelDate"
                type="date"
                style="
                  width:100%;
                  padding:12px;
                  margin:10px 0;
                "
              >

              <button
                onclick="searchHostels()"
                style="
                  width:100%;
                  padding:14px;
                  border:0;
                  border-radius:10px;
                "
              >
                Search Hostels
              </button>

              <div
                id="hostelResult"
                style="
                  margin-top:20px;
                "
              ></div>

              <button
                onclick="closeModal()"
                style="
                  margin-top:15px;
                  padding:12px 18px;
                  border:0;
                  border-radius:10px;
                "
              >
                Close
              </button>

            </div>
          `;

          modal.style.display =
            "flex";
        }
      );

    }
  );
}

function searchHostels() {

  const destination =
    document.getElementById(
      "hostelDestination"
    ).value;

  const result =
    document.getElementById(
      "hostelResult"
    );

  result.innerHTML = `
    <div style="
      padding:15px;
      border-radius:10px;
      background:#f2f2f2;
    ">
      🏨 Hostel search prepared for
      <strong>
        ${escapeHTML(destination)}
      </strong>.

      <br><br>

      Booking integration can be
      connected to a hotel/hostel API
      later.
    </div>
  `;
}

/* =========================================
   LOGIN / OTP DEMO
========================================= */

function setupLogin() {

  const loginButtons =
    document.querySelectorAll(
      "#loginBtn, .login-btn, [data-action='login']"
    );

  loginButtons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        function(event) {

          event.preventDefault();

          createModalIfNeeded();

          modalContent.innerHTML = `
            <div style="
              background:white;
              color:#111;
              padding:25px;
              border-radius:20px;
            ">

              <h2>🔐 Login</h2>

              <input
                id="loginPhone"
                type="tel"
                maxlength="10"
                placeholder="Mobile Number"
                style="
                  width:100%;
                  padding:13px;
                  margin:10px 0;
                "
              >

              <button
                onclick="sendDemoOTP()"
                style="
                  width:100%;
                  padding:13px;
                  border:0;
                  border-radius:10px;
                "
              >
                Send OTP
              </button