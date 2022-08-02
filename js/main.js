"use strict";

/*

=================================== SELECTORS ========================================

*/

const navLinks = document.querySelectorAll("nav ul li");
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavbarInner = document.querySelector(".mobile-navbar-inner");
const navBtn = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");
const root = document.documentElement;
const scrollToTopBtn = document.querySelector(".scroll-to-top");

function setDarkTheme() {
  root.style.setProperty("--background", "#121212");
  root.style.setProperty("--black", "#ffffff");
  root.style.setProperty("--white", "#000000");
  root.style.setProperty("--text-color", "#959595");
}

function setLightTheme() {
  root.style.setProperty("--background", "#fafafa");
  root.style.setProperty("--black", "#000000");
  root.style.setProperty("--white", "#ffffff");
  root.style.setProperty("--text-color", "#4d4d4d");
}

function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  navBtn.classList.toggle("active");
  overlay.classList.toggle("active");
}

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
