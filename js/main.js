"use strict";

/*

=================================== SELECTORS ========================================

*/

const navLinks = document.querySelectorAll("nav ul li");
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavbarInner = document.querySelector(".mobile-navbar-inner");
const mobileNavbarBtn = document.querySelector(".mobile-toggles__navbar");
const navBtn = document.querySelector(".burger");
const desktopHeader = document.querySelector("header");
const mobileHeader = document.querySelector(".mobile-header");
const desktopLogo = desktopHeader.querySelector("img");
const mobileLogo = mobileHeader.querySelector("img");
const heroSection = document.querySelector("#hero");
const root = document.documentElement;
const themeBtns = document.querySelectorAll(".theme-switch");
const scrollToTopBtn = document.querySelector(".scroll-to-top");
const allSections = document.querySelectorAll(".section--slide");
const testimonialSection = document.querySelector("#testimonial");
const testSlider = document.querySelector(".testimonial__slider-inner");
const testSlides = document.querySelectorAll(".testimonial__slide");
const nextSlideBtn = document.querySelector(".slide__next--btn");
const prevSlideBtn = document.querySelector(".slide__prev--btn");
let curSlide = 0;

/*

===================================== FUNCTIONS ===============================================

*/

function setDarkTheme() {
  root.style.setProperty("--background", "#121212");
  root.style.setProperty("--text-color", "#ffffff");
  desktopLogo.src = "assets/big_hive-logo-2.png";
  mobileLogo.src = "assets/big_hive-logo-2.png";
  themeBtns.forEach((btn) => {
    btn.querySelector("ion-icon").name = "partly-sunny-outline";
  });
}

function setLightTheme() {
  root.style.setProperty("--background", "#e9ab17");
  root.style.setProperty("--text-color", "#000000");
  desktopLogo.src = "assets/big_hive-logo-1.png";
  mobileLogo.src = "assets/big_hive-logo-1.png";
  themeBtns.forEach((btn) => {
    btn.querySelector("ion-icon").name = "moon-outline";
  });
}

function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  mobileNavbarBtn.classList.toggle("active");
}

function nextSlide() {
  if (curSlide === testSlides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  testSlider.style.transform = `translateX(${-25 * curSlide}%)`;
}

function prevSlide() {
  if (curSlide === 0) {
    curSlide = testSlides.length - 1;
  } else {
    curSlide--;
  }
  testSlider.style.transform = `translateX(${-25 * curSlide}%)`;
}
/*

===================================== EVENT HANDLERS ===============================================

*/

// Reveal header on scroll
const revealHeader = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    desktopHeader.classList.add("reveal");
    scrollToTopBtn.classList.add("reveal");
  } else {
    desktopHeader.classList.remove("reveal");
    scrollToTopBtn.classList.remove("reveal");
  }
};
const headerObserver = new IntersectionObserver(revealHeader, {
  root: null,
  threshold: 0,
});
headerObserver.observe(heroSection);

// Reveal section on scroll
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

/*

===================================== EVENT HANDLERS ===============================================

*/

// Navbar toggle
mobileNavbarBtn.addEventListener("click", openAndCloseNavbar);
mobileNavbar.addEventListener("click", function (e) {
  if (e.target.closest("ul").classList.contains("mobile-navbar-links"))
    openAndCloseNavbar();
});
// animate hover state on navbar links (desktop)
function showPointer(links) {
  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      link.classList.add("w-100");
    });
    link.addEventListener("mouseleave", function () {
      link.classList.remove("w-100");
    });
  });
}
showPointer(navLinks);

// scroll to top
scrollToTopBtn.addEventListener("click", function (e) {
  window.scrollTo(0, 0);
});

// Theme toggle
themeBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("light")) {
      setDarkTheme();
      btn.classList.remove("light");
      btn.classList.add("dark");
    } else {
      setLightTheme();
      btn.classList.remove("dark");
      btn.classList.add("light");
    }
  });
});

// testimonial slider
nextSlideBtn.addEventListener("click", nextSlide);
prevSlideBtn.addEventListener("click", prevSlide);

function activateSlider(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  setInterval(nextSlide, 6000);
  observer.unobserve(entry.target);
}
const testimonialObserver = new IntersectionObserver(activateSlider, {
  root: null,
  threshold: 0.5,
});

testimonialObserver.observe(testimonialSection);
