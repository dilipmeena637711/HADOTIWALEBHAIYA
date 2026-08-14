/* =========================================================
   HADOTI WALE BHAIYA
   MASTER SCRIPT - COMPLETE RUNNING FRONTEND
   Works with current index.html + style.css
   ========================================================= */

"use strict";

const API_BASE_URL = "https://hadotiwalebhaiya.onrender.com";

const LOCAL_DESTINATIONS = [
  {name:"Jaipur",state:"Rajasthan",rating:"4.9",reviews:"12K",image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",description:"The Pink City of Rajasthan, famous for forts, palaces and royal culture."},
  {name:"Udaipur",state:"Rajasthan",rating:"4.8",reviews:"9K",image:"https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=900&q=80",description:"The City of Lakes, famous for beautiful palaces and lakes."},
  {name:"Jaisalmer",state:"Rajasthan",rating:"4.9",reviews:"7K",image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",description:"The Golden City of Rajasthan with desert adventures and forts."},
  {name:"Jodhpur",state:"Rajasthan",rating:"4.8",reviews:"8K",image:"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=900&q=80",description:"The Blue City, home of Mehrangarh Fort and royal heritage."},
  {name:"Mount Abu",state:"Rajasthan",rating:"4.7",reviews:"6K",image:"https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80",description:"Rajasthan's beautiful hill station."},
  {name:"Kota",state:"Rajasthan",rating:"4.6",reviews:"4K",image:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",description:"A major Hadoti city known for the Chambal River, gardens and heritage."},
  {name:"Bundi",state:"Rajasthan",rating:"4.7",reviews:"3K",image:"https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80",description:"A historic Hadoti destination famous for palace, fort and stepwells."},
  {name:"Manali",state:"Himachal Pradesh",rating:"4.8",reviews:"15K",image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",description:"A beautiful Himalayan destination for mountains and adventure."},
  {name:"Varanasi",state:"Uttar Pradesh",rating:"4.8",reviews:"11K",image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=80",description:"One of India's oldest cities, famous for ghats and spiritual culture."},
  {name:"Goa",state:"Goa",rating:"4.7",reviews:"20K",image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",description:"Beautiful beaches, nightlife and Portuguese heritage."},
  {name:"Kerala",state:"Kerala",rating:"4.8",reviews:"14K",image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",description:"God's Own Country, famous for backwaters and greenery."},
  {name:"Leh Ladakh",state:"Ladakh",rating:"4.9",reviews:"8K",image:"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",description:"High-altitude Himalayan destination with spectacular landscapes."}
];

const MASTER_DESTINATIONS =
    Array.isArray(window.HADOTI_DESTINATIONS)
        ? window.HADOTI_DESTINATIONS
        : [];

let destinations = [
  ...MASTER_DESTINATIONS,
  ...LOCAL_DESTINATIONS
];
let modal = null;
let modalContent = null;

function esc(v) {
  return String(v ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function text(v) {
  return String(v ?? "").toLowerCase().trim().replace(/\s+/g," ");
}

function getDestinationContainer() {
  return document.getElementById("destinationCards");
}

/* ---------------- MODAL ---------------- */

function setupModal() {
  modal = document.getElementById("modal");
  modalContent = document.getElementById("modalContent");

  if (!modal) return;

  const close = document.getElementById("closeModal");

  if (close && !close.dataset.hwBound) {
    close.dataset.hwBound = "1";
    close.addEventListener("click", closeModal);
  }

  if (!modal.dataset.hwBound) {
    modal.dataset.hwBound = "1";

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

function openModal(html) {
  setupModal();

  if (!modal || !modalContent) {
    return;
  }

  modalContent.innerHTML = html;
  modal.classList.add("active");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("active");
  modal.style.display = "none";
  document.body.style.overflow = "";
}

/* ---------------- DESTINATIONS ---------------- */

function renderDestinations(list) {
  const box = getDestinationContainer();

  if (!box) {
    console.warn("destinationCards not found");
    return;
  }

  if (!Array.isArray(list) || list.length === 0) {
    box.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:35px;
        text-align:center;
        color:white;
      ">
        <div style="font-size:42px">🔎</div>

        <h3>
          No destination found
        </h3>

        <p style="color:#aeb7c4">
          Try Jaipur, Rajasthan, Udaipur, Goa or Manali.
        </p>
      </div>
    `;

    return;
  }

  box.innerHTML = "";

  list.forEach(place => {

    const card =
      document.createElement("article");

    card.className = "destination";

    card.innerHTML = `
      <img
        src="${esc(place.image)}"
        alt="${esc(place.name)}"
        loading="lazy"
        onerror="this.style.display='none'"
      >

      <div class="destination-info">

        <b>
          ${esc(place.name)}
        </b>

        <small>
          ${esc(place.state || "")}
        </small>

        <small class="rating">
          ⭐ ${esc(place.rating || "0")}
          (${esc(place.reviews || "0")})
        </small>

      </div>
    `;

    card.addEventListener(
      "click",
      () => showDestination(place)
    );

    box.appendChild(card);
  });
}

function searchDestinations(query) {

  const q = text(query);

  if (!q) {
    renderDestinations(destinations);
    return;
  }

  const results =
    destinations.filter(p =>

      text(p.name).includes(q) ||
      text(p.state).includes(q) ||
      text(p.description).includes(q)

    );

  renderDestinations(results);

  const places =
    document.getElementById("places");

  if (places && q) {
    places.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });
  }
}

/* ---------------- DATABASE ---------------- */

async function loadDestinationsFromDatabase() {

  try {

    const response =
      await fetch(
        API_BASE_URL + "/api/destinations",
        {
          method:"GET",
          headers:{
            Accept:"application/json"
          }
        }
      );

    if (!response.ok) {
      throw new Error(
        "API " + response.status
      );
    }

    const result =
      await response.json();

    let rows = [];

    if (Array.isArray(result)) {
      rows = result;
    }

    else if (
      Array.isArray(result.data)
    ) {
      rows = result.data;
    }

    else if (
      Array.isArray(result.destinations)
    ) {
      rows = result.destinations;
    }

    const converted =
      rows.map((p,i) => ({

        id:
          p.id ||
          p.slug ||
          "db-" + i,

        name:
          p.name ||
          p.title ||
          p.destination ||
          p.city ||
          "Unknown",

        state:
          p.state ||
          p.location ||
          p.city ||
          "",

        rating:
          p.rating ||
          p.average_rating ||
          "0",

        reviews:
          p.reviews ||
          p.total_reviews ||
          "0",

        image:
          p.image ||
          p.image_url ||
          p.photo ||
          "",

        description:
          p.description ||
          "Explore this destination with HADOTI WALE BHAIYA.",

        latitude:
          p.latitude ??
          p.lat ??
          null,

        longitude:
          p.longitude ??
          p.lng ??
          null

      }));

    const merged =
  [
    ...MASTER_DESTINATIONS,
    ...LOCAL_DESTINATIONS,
    ...converted
  ];

    const seen =
      new Set();

    destinations =
      merged.filter(p => {

        const key =
          text(p.name);

        if (
          !key ||
          seen.has(key)
        ) {
          return false;
        }

        seen.add(key);

        return true;
      });

    console.log(
      "Database destinations loaded:",
      converted.length
    );

  }

  catch (err) {

    console.warn(
      "Backend unavailable; local destinations remain active.",
      err
    );

  }

  renderDestinations(
    destinations
  );
}

/* ---------------- SEARCH ---------------- */

function setupSearch() {

  const form =
    document.getElementById(
      "searchForm"
    );

  const input =
    document.getElementById(
      "destinationInput"
    );

  if (!input) {
    console.warn(
      "destinationInput not found"
    );

    return;
  }

  if (!input.dataset.hwBound) {

    input.dataset.hwBound = "1";

    input.addEventListener(
      "input",
      () =>
        searchDestinations(
          input.value
        )
    );
  }

  if (
    form &&
    !form.dataset.hwBound
  ) {

    form.dataset.hwBound = "1";

    form.addEventListener(
      "submit",
      e => {

        e.preventDefault();

        searchDestinations(
          input.value
        );

      }
    );
  }

  document
    .querySelectorAll(
      "[data-place]"
    )
    .forEach(btn => {

      if (
        btn.dataset.hwBound
      ) {
        return;
      }

      btn.dataset.hwBound =
        "1";

      btn.addEventListener(
        "click",
        () => {

          const place =
            btn.getAttribute(
              "data-place"
            ) || "";

          input.value =
            place;

          searchDestinations(
            place
          );

        }
      );

    });
}

/* ---------------- DESTINATION DETAILS ---------------- */

function showDestination(place) {

  openModal(`

    <div style="
      color:white;
      text-align:left
    ">

      <img
        src="${esc(place.image)}"
        alt="${esc(place.name)}"

        style="
          width:100%;
          height:230px;
          object-fit:cover;
          border-radius:15px
        "

        onerror="
          this.style.display='none'
        "
      >

      <h2 style="
        margin-top:18px
      ">
        ${esc(place.name)}
      </h2>

      <p style="
        color:#b8c0cd;
        margin-top:6px
      ">
        📍 ${esc(place.state || "")}
      </p>

      <p style="
        margin-top:10px;
        color:#ffc21e
      ">
        ⭐ ${esc(place.rating || "0")}
        ·
        ${esc(place.reviews || "0")}
        reviews
      </p>

      <p style="
        margin-top:15px;
        line-height:1.7;
        color:#dce1e9
      ">
        ${esc(place.description)}
      </p>

      <div style="
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top:20px
      ">

        <button
          id="hwMap"
          class="primary"
          type="button"
        >
          📍 Open Map
        </button>

        <button
          id="hwBudget"
          type="button"
          style="
            padding:12px 18px;
            border:0;
            border-radius:10px;
            cursor:pointer
          "
        >
          🧮 Budget
        </button>

        <button
          id="hwClose"
          type="button"
          style="
            padding:12px 18px;
            border:1px solid #394b65;
            border-radius:10px;
            background:#091321;
            color:white;
            cursor:pointer
          "
        >
          Close
        </button>

      </div>

    </div>

  `);

  document
    .getElementById("hwMap")
    ?.addEventListener(
      "click",
      () =>
        openGoogleMaps(
          place.name
        )
    );

  document
    .getElementById("hwBudget")
    ?.addEventListener(
      "click",
      () =>
        openBudgetCalculator(
          place.name
        )
    );

  document
    .getElementById("hwClose")
    ?.addEventListener(
      "click",
      closeModal
    );
}

/* ---------------- MAP / ROUTE ---------------- */

function openGoogleMaps(
  placeName
) {

  const url =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      placeName
    );

  window.open(
    url,
    "_blank",
    "noopener"
  );
}

function openMapService() {

  const buttons =
    destinations
      .slice(0,16)
      .map(
        p => `

          <button
            class="hw-place"
            type="button"
            data-name="${esc(p.name)}"

            style="
              padding:13px;
              border:1px solid #33445d;
              border-radius:10px;
              background:#0c1726;
              color:white;
              text-align:left;
              cursor:pointer
            "
          >
            📍 ${esc(p.name)}
            —
            ${esc(p.state)}
          </button>

        `
      )
      .join("");

  openModal(`

    <div style="
      color:white
    ">

      <h2>
        🌍 Explore Map
      </h2>

      <p style="
        color:#b8c0cd;
        margin:8px 0 18px
      ">
        Choose a destination to
        open it on Google Maps.
      </p>

      <div style="
        display:grid;
        gap:10px
      ">
        ${buttons}
      </div>

      <button
        id="hwMapClose"
        type="button"
        style="
          margin-top:18px;
          padding:12px 18px;
          border:0;
          border-radius:10px;
          cursor:pointer
        "
      >
        Close
      </button>

    </div>

  `);

  document
    .querySelectorAll(
      ".hw-place"
    )
    .forEach(
      b =>
        b.addEventListener(
          "click",
          () =>
            openGoogleMaps(
              b.dataset.name
            )
        )
    );

  document
    .getElementById(
      "hwMapClose"
    )
    ?.addEventListener(
      "click",
      closeModal
    );
}
/* =========================================================
   BUDGET CALCULATOR
   ========================================================= */

function openBudgetCalculator(destinationName = "") {

  openModal(`

    <div style="
      color:white;
      text-align:left;
    ">

      <h2>💰 Budget Calculator</h2>

      ${
        destinationName
          ? `
            <p style="color:#b8c0cd">
              Destination:
              <strong>${esc(destinationName)}</strong>
            </p>
          `
          : ""
      }

      <label>
        👥 Number of people
      </label>

      <input
        id="hwPeople"
        type="number"
        min="1"
        value="2"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <label>
        📅 Number of days
      </label>

      <input
        id="hwDays"
        type="number"
        min="1"
        value="3"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <label>
        💵 Daily budget per person
      </label>

      <input
        id="hwDaily"
        type="number"
        min="0"
        value="2000"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <button
        id="hwCalculate"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
          background:linear-gradient(135deg,#7c2bff,#2389ff);
          color:white;
          font-weight:bold;
        "
      >
        Calculate Budget
      </button>

      <div
        id="hwBudgetResult"
        style="
          margin-top:20px;
          padding:15px;
          border-radius:12px;
          background:#101c2d;
        "
      ></div>

      <button
        id="hwBudgetClose"
        type="button"
        style="
          margin-top:15px;
          padding:12px 18px;
          border:1px solid #394b65;
          border-radius:10px;
          background:#091321;
          color:white;
          cursor:pointer;
        "
      >
        Close
      </button>

    </div>

  `);

  document
    .getElementById("hwCalculate")
    ?.addEventListener(
      "click",
      calculateBudget
    );

  document
    .getElementById("hwBudgetClose")
    ?.addEventListener(
      "click",
      closeModal
    );
}


function calculateBudget() {

  const people =
    Number(
      document.getElementById(
        "hwPeople"
      )?.value
    ) || 1;

  const days =
    Number(
      document.getElementById(
        "hwDays"
      )?.value
    ) || 1;

  const daily =
    Number(
      document.getElementById(
        "hwDaily"
      )?.value
    ) || 0;

  const total =
    people *
    days *
    daily;

  const result =
    document.getElementById(
      "hwBudgetResult"
    );

  if (!result) return;

  result.innerHTML = `

    <div style="
      font-size:15px;
      color:#b8c0cd;
    ">
      Estimated Trip Budget
    </div>

    <div style="
      font-size:28px;
      font-weight:bold;
      margin-top:5px;
    ">
      ₹${total.toLocaleString("en-IN")}
    </div>

    <div style="
      margin-top:8px;
      color:#8fa0b5;
      font-size:13px;
    ">
      ${people} people ×
      ${days} days ×
      ₹${daily.toLocaleString("en-IN")} per person/day
    </div>

  `;
}


/* =========================================================
   HOTEL / HOSTEL SEARCH
   ========================================================= */

function openHotelBooking() {

  const options =
    destinations
      .map(
        p => `
          <option value="${esc(p.name)}">
            ${esc(p.name)}
          </option>
        `
      )
      .join("");

  openModal(`

    <div style="
      color:white;
      text-align:left;
    ">

      <h2>🏨 Hotel & Hostel Booking</h2>

      <p style="
        color:#b8c0cd;
      ">
        Select your destination and date.
      </p>

      <label>
        📍 Destination
      </label>

      <select
        id="hwHotelDestination"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >
        ${options}
      </select>

      <label>
        📅 Check-in date
      </label>

      <input
        id="hwHotelDate"
        type="date"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <button
        id="hwHotelSearch"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
          background:linear-gradient(135deg,#7c2bff,#2389ff);
          color:white;
          font-weight:bold;
        "
      >
        Search Stays
      </button>

      <div
        id="hwHotelResult"
        style="
          margin-top:20px;
        "
      ></div>

      <button
        id="hwHotelClose"
        type="button"
        style="
          margin-top:15px;
          padding:12px 18px;
          border:1px solid #394b65;
          border-radius:10px;
          background:#091321;
          color:white;
          cursor:pointer;
        "
      >
        Close
      </button>

    </div>

  `);

  document
    .getElementById(
      "hwHotelSearch"
    )
    ?.addEventListener(
      "click",
      searchHotels
    );

  document
    .getElementById(
      "hwHotelClose"
    )
    ?.addEventListener(
      "click",
      closeModal
    );
}


function searchHotels() {

  const destination =
    document.getElementById(
      "hwHotelDestination"
    )?.value || "";

  const date =
    document.getElementById(
      "hwHotelDate"
    )?.value || "";

  const result =
    document.getElementById(
      "hwHotelResult"
    );

  if (!result) return;

  result.innerHTML = `

    <div style="
      padding:16px;
      border-radius:12px;
      background:#101c2d;
    ">

      <h3>
        🏨 Stay Search
      </h3>

      <p style="
        color:#dce1e9;
      ">
        Destination:
        <strong>
          ${esc(destination)}
        </strong>
      </p>

      ${
        date
          ? `
            <p style="
              color:#b8c0cd;
            ">
              📅 Check-in:
              ${esc(date)}
            </p>
          `
          : ""
      }

      <p style="
        color:#b8c0cd;
        line-height:1.6;
      ">
        Stay-search interface is ready.
        Real hotel inventory will require
        a connected booking provider/API.
      </p>

    </div>

  `;
}


/* =========================================================
   AI TRIP PLANNER
   ========================================================= */

function openTripPlanner() {

  openModal(`

    <div style="
      color:white;
      text-align:left;
    ">

      <h2>🤖 AI Trip Planner</h2>

      <p style="
        color:#b8c0cd;
      ">
        Create a simple travel plan.
      </p>

      <label>
        📍 Destination
      </label>

      <input
        id="hwPlannerDestination"
        type="text"
        placeholder="Example: Rajasthan"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <label>
        📅 Number of days
      </label>

      <input
        id="hwPlannerDays"
        type="number"
        min="1"
        value="3"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <button
        id="hwPlannerGenerate"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
          background:linear-gradient(135deg,#7c2bff,#2389ff);
          color:white;
          font-weight:bold;
        "
      >
        ✨ Create My Trip
      </button>

      <div
        id="hwPlannerResult"
        style="
          margin-top:20px;
        "
      ></div>

      <button
        id="hwPlannerClose"
        type="button"
        style="
          margin-top:15px;
          padding:12px 18px;
          border:1px solid #394b65;
          border-radius:10px;
          background:#091321;
          color:white;
          cursor:pointer;
        "
      >
        Close
      </button>

    </div>

  `);

  document
    .getElementById(
      "hwPlannerGenerate"
    )
    ?.addEventListener(
      "click",
      generateTripPlan
    );

  document
    .getElementById(
      "hwPlannerClose"
    )
    ?.addEventListener(
      "click",
      closeModal
    );
}


function generateTripPlan() {

  const destination =
    document.getElementById(
      "hwPlannerDestination"
    )?.value.trim();

  const days =
    Number(
      document.getElementById(
        "hwPlannerDays"
      )?.value
    ) || 3;

  const result =
    document.getElementById(
      "hwPlannerResult"
    );

  if (!result) return;

  if (!destination) {

    result.innerHTML = `
      <div style="
        color:#ff6b6b;
        padding:12px;
      ">
        Please enter a destination.
      </div>
    `;

    return;
  }

  const safe =
    esc(destination);

  let itinerary = "";

  for (
    let i = 1;
    i <= days;
    i++
  ) {

    if (i === 1) {

      itinerary += `
        <li>
          <strong>Day 1:</strong>
          Arrival and local exploration
        </li>
      `;

    } else if (i === days) {

      itinerary += `
        <li>
          <strong>Day ${i}:</strong>
          Shopping, local food and departure
        </li>
      `;

    } else {

      itinerary += `
        <li>
          <strong>Day ${i}:</strong>
          Main attractions and local experiences
        </li>
      `;

    }
  }

  result.innerHTML = `

    <div style="
      padding:16px;
      border-radius:12px;
      background:#101c2d;
    ">

      <h3>
        ✈️ ${safe}
      </h3>

      <p>
        ${days}-day suggested itinerary
      </p>

      <ol style="
        line-height:1.8;
        padding-left:22px;
      ">
        ${itinerary}
      </ol>

    </div>

  `;
}


/* =========================================================
   LOGIN / DEMO OTP
   ========================================================= */

function openLogin() {

  openModal(`

    <div style="
      color:white;
      text-align:left;
    ">

      <h2>🔐 Login</h2>

      <p style="
        color:#b8c0cd;
      ">
        Enter your 10-digit mobile number.
      </p>

      <input
        id="hwPhone"
        type="tel"
        inputmode="numeric"
        maxlength="10"
        placeholder="10 digit mobile number"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:10px 0 15px;
          border-radius:10px;
          border:1px solid #394b65;
        "
      >

      <button
        id="hwSendOtp"
        type="button"
        style="
          width:100%;
          padding:14px;
          border:0;
          border-radius:10px;
          cursor:pointer;
          background:linear-gradient(135deg,#7c2bff,#2389ff);
          color:white;
          font-weight:bold;
        "
      >
        Send OTP
      </button>

      <div
        id="hwOtpArea"
        style="
          margin-top:18px;
        "
      ></div>

      <button
        id="hwLoginClose"
        type="button"
        style="
          margin-top:15px;
          padding:12px 18px;
          border:1px solid #394b65;
          border-radius:10px;
          background:#091321;
          color:white;
          cursor:pointer;
        "
      >
        Close
      </button>

    </div>

  `);

  document
    .getElementById("hwSendOtp")
    ?.addEventListener(
      "click",
      sendDemoOTP
    );

  document
    .getElementById("hwLoginClose")
    ?.addEventListener(
      "click",
      closeModal
    );
}


function sendDemoOTP() {

  const phone =
    document.getElementById(
      "hwPhone"
    )?.value.trim();

  const area =
    document.getElementById(
      "hwOtpArea"
    );

  if (!/^[0-9]{10}$/.test(phone)) {

    if (area) {

      area.innerHTML = `
        <div style="
          color:#ff6b6b;
        ">
          Enter a valid 10 digit mobile number.
        </div>
      `;

    }

    return;
  }

  const otp =
    String(
      Math.floor(
        100000 +
        Math.random() * 900000
      )
    );

  sessionStorage.setItem(
    "HW_DEMO_OTP",
    otp
  );

  if (area) {

    area.innerHTML = `

      <div style="
        padding:14px;
        border-radius:12px;
        background:#101c2d;
      ">

        <p>
          Demo OTP:
          <strong>${otp}</strong>
        </p>

        <input
          id="hwVerifyOtp"
          type="text"
          inputmode="numeric"
          maxlength="6"
          placeholder="Enter OTP"
          style="
            width:100%;
            box-sizing:border-box;
            padding:13px;
            margin:8px 0 12px;
            border-radius:10px;
            border:1px solid #394b65;
          "
        >

        <button
          id="hwVerifyOtp"
          type="button"
          style="
            width:100%;
            padding:13px;
            border:0;
            border-radius:10px;
            cursor:pointer;
          "
        >
          Verify OTP
        </button>

        <div
          id="hwOtpMessage"
          style="
            margin-top:12px;
          "
        ></div>

      </div>

    `;

    document
      .getElementById(
        "hwVerifyOtp"
      )
      ?.addEventListener(
        "click",
        verifyDemoOTP
      );
  }
}


function verifyDemoOTP() {

  const entered =
    document.getElementById(
      "hwVerifyOtp"
    )?.value.trim();

  const saved =
    sessionStorage.getItem(
      "HW_DEMO_OTP"
    );

  const message =
    document.getElementById(
      "hwOtpMessage"
    );

  if (
    entered &&
    saved &&
    entered === saved
  ) {

    sessionStorage.setItem(
      "HW_LOGGED_IN",
      "true"
    );

    if (message) {

      message.innerHTML = `
        <strong style="
          color:#39d98a;
        ">
          ✅ Login successful!
        </strong>
      `;

    }

  } else {

    if (message) {

      message.innerHTML = `
        <strong style="
          color:#ff6b6b;
        ">
          ❌ Wrong OTP.
        </strong>
      `;

    }

  }
}
/* =========================================================
HADOTI WALE BHAIYA
FINAL INITIALIZATION + BUTTON FIX
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

console.log("HADOTI WALE BHAIYA: Starting...");

/* -------------------------
   MODAL
------------------------- */
setupModal();

/* -------------------------
   DESTINATIONS
------------------------- */
renderDestinations(destinations);

/* -------------------------
   SEARCH
------------------------- */
setupSearch();

/* -------------------------
   AI TRIP PLANNER
------------------------- */
const planBtn = document.getElementById("planBtn");
const quickPlanner = document.getElementById("quickPlanner");

if (planBtn && !planBtn.dataset.hwBound) {
    planBtn.dataset.hwBound = "1";

    planBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openTripPlanner();
    });
}

if (quickPlanner && !quickPlanner.dataset.hwBound) {
    quickPlanner.dataset.hwBound = "1";

    quickPlanner.addEventListener("click", function (e) {
        e.preventDefault();
        openTripPlanner();
    });
}

/* -------------------------
   LOGIN
------------------------- */
const loginBtn = document.getElementById("loginBtn");

if (loginBtn && !loginBtn.dataset.hwBound) {

    loginBtn.dataset.hwBound = "1";

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        openLogin();
    });
}

/* -------------------------
   ROUTE
------------------------- */
const routeBtn = document.getElementById("routeBtn");

if (routeBtn && !routeBtn.dataset.hwBound) {

    routeBtn.dataset.hwBound = "1";

    routeBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const routeTo =
            document.getElementById("routeTo")?.value.trim();

        if (!routeTo) {

            alert("Please enter a destination.");

            return;
        }

        openGoogleMaps(routeTo);
    });
}

/* -------------------------
   QUICK SERVICES
------------------------- */

document.querySelectorAll(".quick-card").forEach(function (card) {

    if (card.dataset.hwBound) return;

    card.dataset.hwBound = "1";

    card.addEventListener("click", function (e) {

        e.preventDefault();

        const title =
            card.querySelector("b")?.innerText
            ?.toLowerCase()
            .trim() || "";

if (title.includes("explore map")) {

    window.location.href = "earth-%20test.html";

} else if (title.includes("ai trip planner")) {

    openTripPlanner();

} else if (title.includes("budget calculator")) {

    openBudgetCalculator();

} else if (title.includes("hotel booking")) {

    openHotelBooking();

} else if (title.includes("local guides")) {

    openSimpleMessage(
        "🧑‍✈️ Local Guides",
        "Local guide service will be connected to the database."
    );

} else if (title.includes("travel stories")) {

    openSimpleMessage(
        "📖 Travel Stories",
        "Travel stories module is ready."
    );

} else if (title.includes("offers")) {

    openSimpleMessage(
        "🏷️ Offers & Deals",
        "Offers and deals module is ready."
    );

} else if (title.includes("emergency")) {

    openSimpleMessage(
        "🆘 Emergency",
        "Emergency support module is ready."
    );

}

});
});

/* -------------------------
   THEME
------------------------- */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn && !themeBtn.dataset.hwBound) {

    themeBtn.dataset.hwBound = "1";

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const enabled =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "HW_DARK_MODE",
            enabled ? "true" : "false"
        );
    });

    if (
        localStorage.getItem("HW_DARK_MODE") === "true"
    ) {
        document.body.classList.add("dark-mode");
    }
}

/* -------------------------
   MOBILE MENU
------------------------- */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".desktop-nav");

if (menuBtn && nav && !menuBtn.dataset.hwBound) {

    menuBtn.dataset.hwBound = "1";

    menuBtn.addEventListener("click", function () {

        nav.classList.toggle("mobile-nav-open");

    });
}

/* -------------------------
   DATABASE
------------------------- */

loadDestinationsFromDatabase();

/* -------------------------
   ESCAPE KEY
------------------------- */

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeModal();

    }
});

console.log(
    "HADOTI WALE BHAIYA: Website initialized successfully."
);

});

/* =========================================================
SIMPLE INFORMATION MODAL
========================================================= */

function openSimpleMessage(title, message) {

openModal(`

    <div style="
        color:white;
        text-align:left;
    ">

        <h2>${esc(title)}</h2>

        <p style="
            color:#b8c0cd;
            line-height:1.7;
            margin-top:12px;
        ">
            ${esc(message)}
        </p>

        <button
            id="hwSimpleClose"
            type="button"
            style="
                margin-top:20px;
                padding:12px 20px;
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
    .getElementById("hwSimpleClose")
    ?.addEventListener(
        "click",
        closeModal
    );

}

/* =========================================================
FIXED OTP SYSTEM
========================================================= */

function sendDemoOTP() {

const phone =
    document.getElementById("hwPhone")
    ?.value
    .trim();

const area =
    document.getElementById("hwOtpArea");

if (!/^[0-9]{10}$/.test(phone)) {

    if (area) {

        area.innerHTML = `

            <div style="
                color:#ff6b6b;
                padding:10px 0;
            ">
                Enter a valid 10 digit mobile number.
            </div>

        `;
    }

    return;
}

const otp =
    String(
        Math.floor(
            100000 +
            Math.random() * 900000
        )
    );

sessionStorage.setItem(
    "HW_DEMO_OTP",
    otp
);

if (!area) return;

area.innerHTML = `

    <div style="
        padding:14px;
        border-radius:12px;
        background:#101c2d;
    ">

        <p>
            Demo OTP:
            <strong>${otp}</strong>
        </p>

        <input
            id="hwVerifyOtpInput"
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="Enter OTP"
            style="
                width:100%;
                box-sizing:border-box;
                padding:13px;
                margin:8px 0 12px;
                border-radius:10px;
                border:1px solid #394b65;
            "
        >

        <button
            id="hwVerifyOtpButton"
            type="button"
            style="
                width:100%;
                padding:13px;
                border:0;
                border-radius:10px;
                cursor:pointer;
            "
        >
            Verify OTP
        </button>

        <div
            id="hwOtpMessage"
            style="
                margin-top:12px;
            "
        ></div>

    </div>

`;

document
    .getElementById("hwVerifyOtpButton")
    ?.addEventListener(
        "click",
        verifyDemoOTP
    );

}

/* =========================================================
VERIFY OTP
========================================================= */

function verifyDemoOTP() {

const entered =
    document.getElementById(
        "hwVerifyOtpInput"
    )
    ?.value
    .trim();

const saved =
    sessionStorage.getItem(
        "HW_DEMO_OTP"
    );

const message =
    document.getElementById(
        "hwOtpMessage"
    );

if (
    entered &&
    saved &&
    entered === saved
) {

    sessionStorage.setItem(
        "HW_LOGGED_IN",
        "true"
    );

    if (message) {

        message.innerHTML = `

            <strong style="
                color:#39d98a;
            ">
                ✅ Login successful!
            </strong>

        `;
    }

} else {

    if (message) {

        message.innerHTML = `

            <strong style="
                color:#ff6b6b;
            ">
                ❌ Wrong OTP.
            </strong>

        `;
    }
}

}

/* =========================================================
GLOBAL FUNCTIONS
========================================================= */

window.searchDestinations =
searchDestinations;

window.openGoogleMaps =
openGoogleMaps;

window.openMapService =
openMapService;

window.openBudgetCalculator =
openBudgetCalculator;

window.openHotelBooking =
openHotelBooking;

window.openTripPlanner =
openTripPlanner;

window.openLogin =
openLogin;

window.closeModal =
closeModal;

window.showDestination =
showDestination;

window.sendDemoOTP =
sendDemoOTP;

window.verifyDemoOTP =
verifyDemoOTP;

window.generateTripPlan =
generateTripPlan;

window.calculateBudget =
calculateBudget;

console.log(
"HADOTI WALE BHAIYA FINAL FIX LOADED."
);