'use strict';

// *************************************************************************************************************
/* *** PRELOAD ***  -->  loading will be end after document is loaded */
const preloader = document.querySelector("[data-preload]");
window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});
// ***************************************************************************
// preloader.classList.add("loaded");    -->>   This line adds the CSS class "loaded" to the preloader element. The preloader variable presumably refers to an HTML element on the page, often used to show a loading animation or message before the page content is fully loaded. Adding the "loaded" class to this element likely triggers CSS styles or animations to hide or remove the loading indicator.

// document.body.classList.add("loaded");   -->>   This line adds the CSS class "loaded" to the body element of the HTML document. This class is commonly used to indicate that the entire page has finished loading, and it may be used in CSS or JavaScript to trigger certain behaviors or animations once the page is fully loaded.
// ***************************************************************************
// *************************************************************************************************************



// *************************************************************************************************************
/* *****  Add event listener on multiple elements *****************/
const addEventOnElements = function (elements, eventType, callback) {             
  for (let i = 0, len = elements.length; i < len; i++) {                      
    elements[i].addEventListener(eventType, callback);
  }
}
// function takes element(like navbar, overlay), event(like click, scroll) and callAnotherFunction(like func that active the overlay or navbar) as parameter
// *************************************************************************************************************



// *************************************************************************************************************
/* ******************** NavBar **********************/
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = function () {
  navbar.classList.toggle("active");              // active the (navbar -> toggle element) in the navbar class OR navbar display over visible display page
  overlay.classList.toggle("active");             // active the (overlay -> toggle element) in the navbar class OR navbar overlay to page
  document.body.classList.toggle("nav-active");
}
addEventOnElements(navTogglers, "click", toggleNavbar);
// overlay the navBar over the webpage 
// *************************************************************************************************************



// *************************************************************************************************************
/* ********************  HEADER & BACK TOP BTN **********************/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;
const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;          // if going upward
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  } 
  lastScrollPos = window.scrollY;
}
// function to hide or show header if scroll downward or upward respectively.

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
// function to get back to header if click to the upperBUTTON.
// *************************************************************************************************************




// *************************************************************************************************************
/* ******************** front_pictureSlider **********************/

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}
heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}
heroSliderPrevBtn.addEventListener("click", slidePrev);


/* * auto slide */
let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 5000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);
// *************************************************************************************************************




// *************************************************************************************************************
/* ******************** PARALLAX EFFECT / 3D EFFECT **********************/ 
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (eventt) {
  
  x = (eventt.clientX / window.innerWidth * 10) - 5;
  y = (eventt.clientY / window.innerHeight * 10) - 5;
  
  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);
  
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }  
});
// *************************************************************************************************************