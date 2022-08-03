"use strict";

/*

=================================== SELECTORS ========================================

*/

const navLinks = document.querySelectorAll("nav ul li");
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavbarInner = document.querySelector(".mobile-navbar-inner");
const mobileNavbarBtn = document.querySelector(".mobile-toggles__navbar");
const navBtn = document.querySelector(".burger");
const root = document.documentElement;
const themeBtns = document.querySelectorAll(".theme-switch");
const scrollToTopBtn = document.querySelector(".scroll-to-top");

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
