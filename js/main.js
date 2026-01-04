const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const header = document.getElementById("header");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// HEADER SCROLL
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});
// HEADER SCROLL
window.addEventListener("scroll", () => {
  document.querySelector(".header")
    .classList.toggle("scrolled", window.scrollY > 50);
});

// MENU MOBILE
document.querySelector(".menu-toggle").onclick = () => {
  document.querySelector(".nav-links").classList.toggle("active");
};

// SWIPER
new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
