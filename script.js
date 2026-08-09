/* =========================================================
   HADOTI WALE BHAIYA
   PREMIUM TRAVEL WEBSITE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const travelType = document.getElementById("travelType");

  const resultsSection = document.getElementById("resultsSection");
  const resultsGrid = document.getElementById("resultsGrid");
  const resultsTitle = document.getElementById("resultsTitle");
  const clearSearch = document.getElementById("clearSearch");

  const plannerBtn = document.getElementById("plannerBtn");
  const plannerModal = document.getElementById("plannerModal");
  const modalClose = document.getElementById("modalClose");

  const generatePlan = document.getElementById("generatePlan");

  const planDestination = document.getElementById("planDestination");
  const planDays = document.getElementById("planDays");
  const planStyle = document.getElementById("planStyle");
  const planResult = document.getElementById("planResult");

  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMessage = document.getElementById("newsletterMessage");

  const toast = document.getElementById("toast");


  /* =======================================================
     HEADER SCROLL EFFECT
     ======================================================= */

  window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  });


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });


  document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });

  });


  /* =======================================================
     DESTINATION DATA
     ======================================================= */

  const destinations = [

    {
      name: "Rajasthan",
      country: "INDIA",
      type: "culture",
      description: "Royal cities, forts & desert adventures",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Dubai",
      country: "UAE",
      type: "luxury",
      description: "Luxury, architecture & unforgettable experiences",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Bali",
      country: "INDONESIA",
      type: "nature",
      description: "Tropical islands, temples & beaches",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Paris",
      country: "FRANCE",
      type: "culture",
      description: "Art, architecture, food & romance",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Switzerland",
      country: "EUROPE",
      type: "nature",
      description: "Mountains, lakes & scenic train journeys",
      image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Maldives",
      country: "MALDIVES",
      type: "luxury",
      description: "Crystal water, islands & private escapes",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "Tokyo",
      country: "JAPAN",
      type: "culture",
      description: "Future cities, food & Japanese culture",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=85"
    },

    {
      name: "New York",
      country: "USA",
      type: "luxury",
      description: "Iconic skyline, culture & city energy",
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1000&q=85"
    }

  ];


  /* =======================================================
     SEARCH
     ======================================================= */

  function performSearch() {

    const query = searchInput.value.trim().toLowerCase();
    const type = travelType.value;

    let filtered = destinations.filter(destination => {

      const matchesText =
        query === "" ||
        destination.name.toLowerCase().includes(query) ||
        destination.country.toLowerCase().includes(query) ||
        destination.description.toLowerCase().includes(query);

      const matchesType =
        type === "all" ||
        destination.type === type;

      return matchesText && matchesType;

    });


    if (query === "" && type === "all") {

      showToast("Type a destination to search.");

      searchInput.focus();

      return;
    }


    resultsGrid.innerHTML = "";


    if (filtered.length === 0) {

      resultsTitle.textContent = "No destinations found";

      resultsGrid.innerHTML = `
        <div style="
          grid-column:1/-1;
          padding:50px;
          text-align:center;
          color:#777;
          background:#f5f5f2;
          border-radius:18px;
        ">
          <h3 style="font-family:serif;font-size:30px;margin-bottom:10px;">
            Nothing found
          </h3>
          <p>
            Try another destination or travel style.
          </p>
        </div>
      `;

    } else {

      resultsTitle.textContent =
        query
          ? `Explore "${searchInput.value.trim()}"`
          : "Explore destinations";

      filtered.forEach(destination => {

        const card = document.createElement("article");

        card.className = "result-card";

        card.innerHTML = `
          <div
            class="result-bg"
            style="background-image:url('${destination.image}')"
          ></div>

          <div class="result-content">
            <span>${destination.country}</span>
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
          </div>
        `;

        resultsGrid.appendChild(card);

      });

    }


    resultsSection.classList.remove("hidden");

    resultsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  searchBtn.addEventListener("click", performSearch);


  searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
      performSearch();
    }

  });


  /* =======================================================
     POPULAR SEARCH BUTTONS
     ======================================================= */

  document.querySelectorAll("[data-search]").forEach(button => {

    button.addEventListener("click", () => {

      searchInput.value = button.dataset.search;

      travelType.value = "all";

      performSearch();

    });

  });


  /* =======================================================
     CLEAR SEARCH
     ======================================================= */

  clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    travelType.value = "all";

    resultsGrid.innerHTML = "";

    resultsSection.classList.add("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =======================================================
     VIEW ALL
     ======================================================= */

  document.getElementById("viewAllBtn").addEventListener("click", () => {

    searchInput.value = "";

    travelType.value = "all";

    resultsGrid.innerHTML = "";

    destinations.forEach(destination => {

      const card = document.createElement("article");

      card.className = "result-card";

      card.innerHTML = `
        <div
          class="result-bg"
          style="background-image:url('${destination.image}')"
        ></div>

        <div class="result-content">
          <span>${destination.country}</span>
          <h3>${destination.name}</h3>
          <p>${destination.description}</p>
        </div>
      `;

      resultsGrid.appendChild(card);

    });

    resultsTitle.textContent = "All destinations";

    resultsSection.classList.remove("hidden");

    resultsSection.scrollIntoView({
      behavior: "smooth"
    });

  });


  /* =======================================================
     AI PLANNER MODAL
     ======================================================= */

  plannerBtn.addEventListener("click", () => {

    plannerModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

  });


  function closePlanner() {

    plannerModal.classList.add("hidden");

    document.body.style.overflow = "";

  }


  modalClose.addEventListener("click", closePlanner);


  document.querySelector(".modal-backdrop").addEventListener(
    "click",
    closePlanner
  );


  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closePlanner();
    }

  });


  /* =======================================================
     AI TRIP GENERATOR
     ======================================================= */

  generatePlan.addEventListener("click", () => {

    const destination = planDestination.value.trim();
    const days = Number(planDays.value);
    const style = planStyle.value;


    if (!destination) {

      showToast("Please enter a destination.");

      planDestination.focus();

      return;
    }


    if (!days || days < 1) {

      showToast("Please enter number of days.");

      planDays.focus();

      return;
    }


    const placesPerDay =
      days <= 3 ? "2–3" :
      days <= 7 ? "3–4" :
      "3–5";


    planResult.innerHTML = `
      <strong>Your ${days}-day ${style} journey to ${destination}</strong>

      <br><br>

      <b>Day 1</b> — Arrival & local exploration<br>
      <b>Day 2</b> — Top attractions & experiences<br>
      <b>Day 3</b> — Hidden gems & local food<br>
      <b>Day ${days}</b> — Relax, explore & departure

      <br><br>

      <span style="color:#8b7040;">
        ✦ Suggested pace: ${placesPerDay} experiences per day.
      </span>

      <br><br>

      <small>
        This is the first planning layer. Real AI itinerary,
        maps, hotels, flights and live pricing can be connected
        through APIs later.
      </small>
    `;

    planResult.classList.remove("hidden");

  });


  /* =======================================================
     NEWSLETTER
     ======================================================= */

  newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim();


    if (!email) {
      return;
    }


    newsletterMessage.textContent =
      "You're on the list. Welcome to the journey ✦";

    newsletterForm.reset();

  });


  /* =======================================================
     TOAST
     ======================================================= */

  let toastTimer;


  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2800);

  }


  /* =======================================================
     DESTINATION CARD CLICK
     ======================================================= */

  document.querySelectorAll(".destination-card").forEach(card => {

    card.addEventListener("click", () => {

      const destination = card.dataset.name;

      searchInput.value = destination;

      travelType.value = card.dataset.type;

      performSearch();

    });

  });


  /* =======================================================
     SMALL ENTRANCE ANIMATION
     ======================================================= */

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: .12
    }
  );


  document
    .querySelectorAll(
      ".feature-card, .destination-card, .planner-card"
    )
    .forEach(element => {

      element.style.opacity = "0";
      element.style.transform = "translateY(25px)";
      element.style.transition =
        "opacity .7s ease, transform .7s ease";

      observer.observe(element);

    });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  console.log(
    "HADOTI WALE BHAIYA — Premium Travel Platform loaded."
  );

});