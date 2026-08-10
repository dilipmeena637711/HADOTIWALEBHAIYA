/* =========================================
   HADOTI WALE BHAIYA
   MASTER FRONTEND JAVASCRIPT
========================================= */


/* =========================================
   DESTINATION DATA
========================================= */

const destinations = [
  {
    name: "Jaipur",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "12K",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
  },

  {
    name: "Udaipur",
    state: "Rajasthan",
    rating: "4.8",
    reviews: "9K",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=800&q=80"
  },

  {
    name: "Jaisalmer",
    state: "Rajasthan",
    rating: "4.9",
    reviews: "7K",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80"
  },

  {
    name: "Manali",
    state: "Himachal Pradesh",
    rating: "4.7",
    reviews: "8K",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
  },

  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    rating: "4.9",
    reviews: "10K",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80"
  },

  {
    name: "Leh Ladakh",
    state: "Ladakh",
    rating: "4.8",
    reviews: "8K",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
  }
];


/* =========================================
   SELECT ELEMENTS
========================================= */

const destinationCards =
  document.getElementById("destinationCards");

const searchForm =
  document.getElementById("searchForm");

const destinationInput =
  document.getElementById("destinationInput");

const modal =
  document.getElementById("modal");

const modalContent =
  document.getElementById("modalContent");


/* =========================================
   DESTINATION CARDS
========================================= */

function loadDestinations() {

  if (!destinationCards) return;

  destinationCards.innerHTML = "";

  destinations.forEach((place, index) => {

    const card =
      document.createElement("article");

    card.className = "destination";

    card.dataset.place = place.name;

    card.innerHTML = `

      ${
        index === 0
          ? `<span class="badge">Popular</span>`
          : ""
      }

      <img
        src="${place.image}"
        alt="${place.name}"
        loading="lazy"
      >

      <div class="destination-info">

        <b>
          ${place.name}
        </b>

        <small>
          ${place.state}
        </small>

        <small class="rating">
          ★ ${place.rating}
          (${place.reviews})
        </small>

      </div>
    `;

    card.addEventListener(
      "click",
      () => openDestination(place)
    );

    destinationCards.appendChild(card);

  });

}


/* =========================================
   MODAL
========================================= */

function openModal(content) {

  if (!modal || !modalContent) return;

  modalContent.innerHTML = content;

  modal.classList.add("open");

}


function closeModal() {

  if (!modal) return;

  modal.classList.remove("open");

}


const closeModalButton =
  document.getElementById("closeModal");

if (closeModalButton) {

  closeModalButton.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    function (event) {

      if (event.target === modal) {

        closeModal();

      }

    }
  );

}


/* =========================================
   DESTINATION DETAIL
========================================= */

function openDestination(place) {

  openModal(`

    <h2>
      📍 ${place.name}
    </h2>

    <p>
      ${place.name}, ${place.state}
    </p>

    <br>

    <p>
      ⭐ Rating:
      <strong>${place.rating}</strong>
    </p>

    <p>
      👥 Reviews:
      ${place.reviews}
    </p>

    <br>

    <p>
      इस destination के complete page में
      history, culture, hotels, restaurants,
      maps, weather, reviews, budget,
      nearby places और AI travel assistant
      उपलब्ध होंगे।
    </p>

    <button
      class="primary"
      onclick="closeModal()">

      Explore Destination →

    </button>

  `);

}


/* =========================================
   SEARCH
========================================= */

if (searchForm) {

  searchForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      const query =
        destinationInput.value.trim();

      if (!query) {

        destinationInput.focus();

        return;

      }

      const result =
        destinations.find(
          place =>
            place.name.toLowerCase() ===
            query.toLowerCase()
        );

      if (result) {

        openDestination(result);

        return;

      }

      openModal(`

        <h2>
          🔎 Searching...
        </h2>

        <p>
          We are searching destinations
          for:
        </p>

        <h3>
          "${query}"
        </h3>

        <br>

        <p>
          Future database connection के बाद
          यहां complete search results आएंगे।
        </p>

        <button
          class="primary"
          onclick="closeModal()">

          Continue Exploring

        </button>

      `);

    }
  );

}


/* =========================================
   POPULAR SEARCH
========================================= */

const popularButtons =
  document.querySelectorAll(
    ".popular button"
  );


popularButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      const place =
        this.dataset.place;

      destinationInput.value =
        place;

      searchForm.dispatchEvent(
        new Event("submit")
      );

    }
  );

});


/* =========================================
   AI TRIP PLANNER
========================================= */

function openTripPlanner() {

  openModal(`

    <h2>
      🤖 AI Trip Planner
    </h2>

    <p>
      अपने trip की details डालें।
    </p>

    <input
      id="tripDestination"
      type="text"
      placeholder="Destination">

    <input
      id="tripDays"
      type="number"
      min="1"
      placeholder="How many days?">

    <input
      id="tripBudget"
      type="number"
      placeholder="Budget ₹">

    <select
      id="tripStyle"
      style="
        width:100%;
        height:45px;
        margin:8px 0;
        padding:0 12px;
        border-radius:10px;
        background:#050b13;
        color:white;
        border:1px solid #35465b;
      "
    >

      <option value="Family">
        Family
      </option>

      <option value="Solo">
        Solo
      </option>

      <option value="Couple">
        Couple
      </option>

      <option value="Friends">
        Friends
      </option>

    </select>


    <button
      class="primary"
      id="generateTrip">

      ✨ Generate My Trip

    </button>

  `);


  const generateButton =
    document.getElementById(
      "generateTrip"
    );


  if (!generateButton) return;


  generateButton.addEventListener(
    "click",
    generateTrip
  );

}


/* =========================================
   GENERATE TRIP
========================================= */

function generateTrip() {

  const destination =
    document.getElementById(
      "tripDestination"
    ).value.trim()
    || "Rajasthan";


  const days =
    document.getElementById(
      "tripDays"
    ).value
    || 3;


  const budget =
    document.getElementById(
      "tripBudget"
    ).value
    || 15000;


  const style =
    document.getElementById(
      "tripStyle"
    ).value;


  openModal(`

    <h2>
      ✨ AI Trip Plan
    </h2>

    <p>
      <strong>${destination}</strong>
    </p>

    <p>
      👤 Travel Style:
      ${style}
    </p>

    <p>
      📅 Duration:
      ${days} Days
    </p>

    <p>
      💰 Budget:
      ₹${budget}
    </p>

    <hr style="
      margin:15px 0;
      border-color:#27384d;
    ">

    <h3>
      Suggested Itinerary
    </h3>

    <br>

    <p>
      🗓️ Day 1 —
      Arrival + Local Exploration
    </p>

    <p>
      🗓️ Day 2 —
      Main Tourist Attractions
    </p>

    <p>
      🗓️ Day 3 —
      Hidden Gems + Local Food
    </p>

    <p>
      🏨 Hotel Recommendation
    </p>

    <p>
      🍛 Food Recommendation
    </p>

    <p>
      🚗 Travel Route
    </p>

    <p>
      🎒 Packing List
    </p>

    <br>

    <button
      class="primary"
      onclick="closeModal()">

      Save Trip

    </button>

  `);

}


/* =========================================
   AI BUTTONS
========================================= */

const planButton =
  document.getElementById("planBtn");

const quickPlanner =
  document.getElementById("quickPlanner");


if (planButton) {

  planButton.addEventListener(
    "click",
    openTripPlanner
  );

}


if (quickPlanner) {

  quickPlanner.addEventListener(
    "click",
    openTripPlanner
  );

}


/* =========================================
   LOGIN / OTP
========================================= */

const loginButton =
  document.getElementById("loginBtn");


if (loginButton) {

  loginButton.addEventListener(
    "click",
    openLogin
  );

}


function openLogin() {

  openModal(`

    <h2>
      👋 Welcome Back
    </h2>

    <p>
      HADOTI WALE BHAIYA में login करें।
    </p>

    <input
      id="phoneNumber"
      type="tel"
      maxlength="10"
      inputmode="numeric"
      placeholder="10-digit mobile number"
    >

    <button
      class="primary"
      id="sendOTP">

      Send OTP

    </button>

  `);


  const sendOTP =
    document.getElementById(
      "sendOTP"
    );


  sendOTP.addEventListener(
    "click",
    sendOTPCode
  );

}


/* =========================================
   SEND OTP DEMO
========================================= */

function sendOTPCode() {

  const phone =
    document.getElementById(
      "phoneNumber"
    ).value.trim();


  if (!/^[0-9]{10}$/.test(phone)) {

    alert(
      "Please enter a valid 10 digit mobile number."
    );

    return;

  }


  openModal(`

    <h2>
      🔐 Verify OTP
    </h2>

    <p>
      OTP sent to
      <strong>+91 ${phone}</strong>
    </p>

    <div
      style="
        display:flex;
        gap:7px;
        margin:15px 0;
      "
    >

      ${[1,2,3,4,5,6]
        .map(
          number => `
            <input
              class="otp-box"
              maxlength="1"
              inputmode="numeric"
              style="
                width:45px;
                height:45px;
                text-align:center;
                font-size:20px;
                border-radius:8px;
                border:1px solid #35465b;
                background:#050b13;
                color:white;
              "
            >
          `
        )
        .join("")
      }

    </div>

    <button
      class="primary"
      id="verifyOTP">

      Verify & Continue

    </button>

  `);


  setupOTP();


  document
    .getElementById("verifyOTP")
    .addEventListener(
      "click",
      verifyOTP
    );

}


/* =========================================
   OTP AUTO FOCUS
========================================= */

function setupOTP() {

  const boxes =
    document.querySelectorAll(
      ".otp-box"
    );


  boxes.forEach(
    (box,index) => {

      box.addEventListener(
        "input",
        function () {

          this.value =
            this.value.replace(
              /[^0-9]/g,
              ""
            );

          if (
            this.value &&
            boxes[index + 1]
          ) {

            boxes[index + 1].focus();

          }

        }
      );

    }
  );

}


/* =========================================
   VERIFY OTP DEMO
========================================= */

function verifyOTP() {

  const boxes =
    document.querySelectorAll(
      ".otp-box"
    );


  let otp = "";


  boxes.forEach(
    box => {
      otp += box.value;
    }
  );


  if (otp.length !== 6) {

    alert(
      "Please enter complete 6 digit OTP."
    );

    return;

  }


  openModal(`

    <h2>
      ✅ Login Successful
    </h2>

    <p>
      Welcome to HADOTI WALE BHAIYA!
    </p>

    <p>
      आपका profile system अब backend
      database से connect किया जा सकता है।
    </p>

    <button
      class="primary"
      onclick="closeModal()">

      Continue

    </button>

  `);

}


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeButton =
  document.getElementById(
    "themeBtn"
  );


if (themeButton) {

  themeButton.addEventListener(
    "click",
    toggleTheme
  );

}


function toggleTheme() {

  document.body.classList.toggle(
    "light"
  );


  const isLight =
    document.body.classList.contains(
      "light"
    );


  localStorage.setItem(
    "hadotiTheme",
    isLight
      ? "light"
      : "dark"
  );

}


/* =========================================
   LOAD SAVED THEME
========================================= */

const savedTheme =
  localStorage.getItem(
    "hadotiTheme"
  );


if (savedTheme === "light") {

  document.body.classList.add(
    "light"
  );

}


/* =========================================
   ROUTE PLANNER
========================================= */

const routeButton =
  document.getElementById(
    "routeBtn"
  );


if (routeButton) {

  routeButton.addEventListener(
    "click",
    showRoute
  );

}


function showRoute() {

  const routeTo =
    document.getElementById(
      "routeTo"
    );


  const destination =
    routeTo.value.trim();


  if (!destination) {

    alert(
      "Please enter your destination."
    );

    routeTo.focus();

    return;

  }


  openModal(`

    <h2>
      🗺️ Route Planner
    </h2>

    <p>
      📍 Jaipur
      →
      <strong>
        ${destination}
      </strong>
    </p>

    <br>

    <p>
      🚗 Driving Route
    </p>

    <p>
      ⏱️ Travel Time
    </p>

    <p>
      ⛽ Estimated Fuel Cost
    </p>

    <p>
      🛣️ Best Route
    </p>

    <br>

    <p style="color:#9faabb;">
      Production version में Google Maps
      या अन्य Maps API connect करके
      live route, distance और traffic
      दिखाया जाएगा।
    </p>

    <button
      class="primary"
      onclick="closeModal()">

      Close

    </button>

  `);

}


/* =========================================
   QUICK SERVICE CARDS
========================================= */

const quickCards =
  document.querySelectorAll(
    ".quick-card"
  );


quickCards.forEach(
  (card,index) => {

    if (index === 1) return;


    card.addEventListener(
      "click",
      function () {

        const title =
          this.querySelector(
            "b"
          )?.textContent
          || "Travel Service";


        openModal(`

          <h2>
            ${title}
          </h2>

          <p>
            यह feature HADOTI WALE BHAIYA
            Travel OS का हिस्सा है।
          </p>

          <p>
            Database और backend connect
            होने के बाद यह module पूरी तरह
            functional होगा।
          </p>

          <br>

          <button
            class="primary"
            onclick="closeModal()">

            Continue

          </button>

        `);

      }
    );

  }
);


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
  document.getElementById(
    "menuBtn"
  );


if (menuButton) {

  menuButton.addEventListener(
    "click",
    function () {

      openModal(`

        <h2>
          ☰ HADOTI WALE BHAIYA
        </h2>

        <br>

        <p>
          🌍 Explore
        </p>

        <p>
          🗺️ Destinations
        </p>

        <p>
          🤖 AI Trip Planner
        </p>

        <p>
          🏨 Hotels
        </p>

        <p>
          📖 Travel Stories
        </p>

        <p>
          👤 My Profile
        </p>

        <p>
          ⚙️ Settings
        </p>

        <br>

        <button
          class="primary"
          onclick="closeModal()">

          Close

        </button>

      `);

    }
  );

}


/* =========================================
   KEYBOARD ESC
========================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeModal();

    }

  }
);


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadDestinations();

    console.log(
      "HADOTI WALE BHAIYA Travel OS loaded successfully."
    );

  }
);