/* =========================================================
   HADOTI WALE BHAIYA
   PREMIUM TRAVEL PLATFORM
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const mainHeader = document.getElementById("mainHeader");

    const themeBtn = document.getElementById("themeBtn");
    const languageBtn = document.getElementById("languageBtn");

    const signBtn = document.getElementById("signBtn");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    const searchInput = document.getElementById("destinationSearch");
    const searchBtn = document.getElementById("searchBtn");

    const openPlanner = document.getElementById("openPlanner");
    const featureAI = document.getElementById("featureAI");
    const createPlanBtn = document.getElementById("createPlanBtn");

    const plannerModal = document.getElementById("plannerModal");
    const closePlanner = document.getElementById("closePlanner");

    const generateTrip = document.getElementById("generateTrip");

    const tripComplete = document.getElementById("tripComplete");
    const closeComplete = document.getElementById("closeComplete");

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("hidden");
            }

        }, 900);

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    window.addEventListener("scroll", () => {

        if (!mainHeader) return;

        if (window.scrollY > 40) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

            const icon = mobileMenuBtn.querySelector("i");

            if (mobileMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                const icon = mobileMenuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const icon = themeBtn.querySelector("i");

            if (document.body.classList.contains("dark-mode")) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

                themeBtn.setAttribute("title", "Light Mode");

                localStorage.setItem("hwb-theme", "dark");

                showToast("Dark mode enabled");

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

                themeBtn.setAttribute("title", "Dark Mode");

                localStorage.setItem("hwb-theme", "light");

                showToast("Light mode enabled");

            }

        });


        if (localStorage.getItem("hwb-theme") === "dark") {

            document.body.classList.add("dark-mode");

            const icon = themeBtn.querySelector("i");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeBtn.setAttribute("title", "Light Mode");

        }

    }


    /* =====================================================
       LANGUAGE BUTTON
    ===================================================== */

    if (languageBtn) {

        languageBtn.addEventListener("click", () => {

            const current = languageBtn.childNodes[0];

            if (current) {

                const text = current.textContent.trim();

                if (text === "हिन्दी") {

                    current.textContent = "English ";

                    showToast("English language selected");

                } else {

                    current.textContent = "हिन्दी ";

                    showToast("हिन्दी भाषा चुनी गई");

                }

            }

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function performSearch() {

        if (!searchInput) return;

        const query = searchInput.value.trim();

        if (!query) {

            showToast("Please enter a destination");

            searchInput.focus();

            return;

        }

        showToast(`Searching for "${query}"...`);

        setTimeout(() => {

            showToast(`Explore results for ${query}`);

        }, 1200);

    }


    if (searchBtn) {

        searchBtn.addEventListener("click", performSearch);

    }


    if (searchInput) {

        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                performSearch();

            }

        });

    }


    /* =====================================================
       POPULAR SEARCH BUTTONS
    ===================================================== */

    document.querySelectorAll(".popular-searches button")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (!searchInput) return;

                searchInput.value = button.textContent.trim();

                searchInput.focus();

                performSearch();

            });

        });


    /* =====================================================
       AI PLANNER OPEN
    ===================================================== */

    function openPlannerModal() {

        if (!plannerModal) return;

        plannerModal.classList.add("active");

        document.body.classList.add("modal-open");

        const plannerDestination =
            document.getElementById("plannerDestination");

        if (plannerDestination) {

            setTimeout(() => {
                plannerDestination.focus();
            }, 250);

        }

    }


    if (openPlanner) {

        openPlanner.addEventListener("click", openPlannerModal);

    }


    if (featureAI) {

        featureAI.addEventListener("click", openPlannerModal);

    }


    if (createPlanBtn) {

        createPlanBtn.addEventListener("click", openPlannerModal);

    }


    /* =====================================================
       CLOSE PLANNER
    ===================================================== */

    function closePlannerModal() {

        if (!plannerModal) return;

        plannerModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    if (closePlanner) {

        closePlanner.addEventListener("click", closePlannerModal);

    }


    if (plannerModal) {

        plannerModal.addEventListener("click", (event) => {

            if (event.target === plannerModal) {

                closePlannerModal();

            }

        });

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closePlannerModal();

            if (tripComplete) {

                tripComplete.classList.remove("active");

            }

        }

    });


    /* =====================================================
       GENERATE TRIP
    ===================================================== */

    if (generateTrip) {

        generateTrip.addEventListener("click", () => {

            const destination =
                document.getElementById("plannerDestination");

            const days =
                document.getElementById("plannerDays");

            const budget =
                document.getElementById("plannerBudget");

            const style =
                document.getElementById("travelStyle");


            if (!destination || !destination.value.trim()) {

                showToast("Please enter your destination");

                destination.focus();

                return;

            }


            const destinationName = destination.value.trim();

            const selectedDays = days ? days.value : "5";

            const selectedBudget =
                budget ? budget.options[budget.selectedIndex].text : "";

            const selectedStyle =
                style ? style.value : "";


            generateTrip.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                CREATING YOUR JOURNEY...
            `;

            generateTrip.disabled = true;


            setTimeout(() => {

                closePlannerModal();

                if (tripComplete) {

                    tripComplete.classList.add("active");

                }

                generateTrip.innerHTML = `
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    GENERATE MY TRIP
                `;

                generateTrip.disabled = false;


                console.log("Trip Plan:", {
                    destination: destinationName,
                    days: selectedDays,
                    budget: selectedBudget,
                    style: selectedStyle
                });

            }, 1800);

        });

    }


    /* =====================================================
       TRIP COMPLETE CLOSE
    ===================================================== */

    if (closeComplete) {

        closeComplete.addEventListener("click", () => {

            if (tripComplete) {

                tripComplete.classList.remove("active");

            }

            showToast("Your itinerary is ready to explore!");

        });

    }


    /* =====================================================
       HEART / FAVOURITES
    ===================================================== */

    document.querySelectorAll(".heart-btn")
        .forEach(button => {

            button.addEventListener("click", (event) => {

                event.preventDefault();
                event.stopPropagation();

                const icon = button.querySelector("i");

                if (!icon) return;


                button.classList.toggle("liked");


                if (button.classList.contains("liked")) {

                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");

                    showToast("Added to your favourites ❤️");

                } else {

                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");

                    showToast("Removed from favourites");

                }

            });

        });


    /* =====================================================
       QUICK TOOLS
    ===================================================== */

    document.querySelectorAll(".quick-tools button")
        .forEach(button => {

            button.addEventListener("click", () => {

                const toolName =
                    button.querySelector("span")?.textContent.trim();

                if (!toolName) return;


                if (toolName === "Near Me") {

                    if ("geolocation" in navigator) {

                        showToast("Finding places near you...");

                        navigator.geolocation.getCurrentPosition(

                            () => {
                                showToast("Location found!");
                            },

                            () => {
                                showToast("Location permission required");
                            }

                        );

                    } else {

                        showToast("Location is not supported");

                    }

                } else {

                    showToast(`${toolName} will open soon`);

                }

            });

        });


    /* =====================================================
       FEATURE BAR
    ===================================================== */

    document.querySelectorAll(".feature-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (button.id === "featureAI") return;

                const title =
                    button.querySelector("strong")?.textContent.trim();

                if (!title) return;

                showToast(`${title} selected`);

            });

        });


    /* =====================================================
       VIEW ALL BUTTONS
    ===================================================== */

    document.querySelectorAll(".view-all")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.closest("section, .panel");

                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                showToast("More travel content coming soon");

            });

        });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target || 0);

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            const eased =
                1 - Math.pow(1 - progress, 3);


            current =
                Math.floor(target * eased);


            counter.textContent =
                current.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString("en-IN");

            }

        }


        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       IMAGE LOADING EFFECT
    ===================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener("load", () => {

                image.classList.add("loaded");

            });

        });


    /* =====================================================
       NOTIFICATION BUTTON
    ===================================================== */

    const notificationBtn =
        document.querySelector(
            ".header-actions .icon-btn:not(#themeBtn)"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            showToast("No new travel notifications");

        });

    }


    /* =====================================================
       SIGN IN
    ===================================================== */

    if (signBtn) {

        signBtn.addEventListener("click", () => {

            showToast("Sign in system coming soon");

        });

    }


    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;


    function showToast(message) {

        if (!toast || !toastMessage) return;


        toastMessage.textContent = message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2800);

    }


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /* =====================================================
       KEYBOARD SHORTCUT
       "/" = SEARCH
    ===================================================== */

    document.addEventListener("keydown", event => {

  