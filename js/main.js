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
const heroSection = document.querySelector("#hero");
const root = document.documentElement;
const themeBtns = document.querySelectorAll(".theme-switch");
const scrollToTopBtn = document.querySelector(".scroll-to-top");
const allSections = document.querySelectorAll(".section--slide");

/*

===================================== FUNCTIONS ===============================================

*/

function setDarkTheme() {
  root.style.setProperty("--background", "#121212");
  root.style.setProperty("--text-color", "#ffffff");
  themeBtns.forEach((btn) => {
    btn.querySelector("ion-icon").name = "partly-sunny-outline";
  });
}

function setLightTheme() {
  root.style.setProperty("--background", "#e9ab17");
  root.style.setProperty("--text-color", "#000000");
  themeBtns.forEach((btn) => {
    btn.querySelector("ion-icon").name = "moon-outline";
  });
}

function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  mobileNavbarBtn.classList.toggle("active");
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
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
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
