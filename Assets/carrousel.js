const carrousel = document.querySelector(".carrousel");
const slider = document.querySelector(".images");
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");
//DOTS
const dotsHTML = document.querySelectorAll(".dot");
const dots = [...dotsHTML];
console.log(dots);

//This is the width i have to slide to the next img
const slideWidth = slider.clientWidth;

//Funcion para que se actualice la pagina en caso de que el clientWidth de los carruseles cambie
function onClientWidth() {
  if (
    slideWidth !== slider.clientWidth ||
    slideWidthBrand !== brandCarrousel.clientWidth
  ) {
    location.reload();
  }
}
//____________________________________________________________________________

//Index of slides
let slideIndex = 0;

//translate
const slideMovement = () => {
  slider.style.transform = `translateX(${-slideWidth * slideIndex}px)`;
  // slider.classList.add("d");
};

const next = () => {
  if (slideIndex === slider.children.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  // onClientWidth();
  slideMovement();
  toggleDots();
};

const prev = () => {
  if (slideIndex === 0) {
    slideIndex = slider.children.length - 1; //slideIndex tomara el valor final
  } else {
    slideIndex--;
  }
  slideMovement();
  toggleDots();
};
const toggleDots = () => {
  dots.forEach((dot) => {
    dot.classList.remove("dot-selected");
  });
  dots[slideIndex].classList.add("dot-selected");
};
toggleDots();

//________________________BRAND CARROUSEL_______________________
const brandCarrousel = document.querySelector(".brand--carrousel__images");
const brandContainer = document.querySelector(".brand--img__container");
const prevBrand = document.querySelector(".prev__brand");
const nextBrand = document.querySelector(".next__brand");

//Tengo que hacer que se actualice constantemente porque sino solo lo toma cuando recargo la pag
const slideWidthBrand = brandCarrousel.clientWidth;
//________________________________________________________________

console.log(slideWidthBrand);
let indexBrand = 0;

const slidePerBrands = () => {
  brandCarrousel.style.transform = `translateX(${
    -slideWidthBrand * indexBrand
  }px)`;
};

const nextBrandSlide = () => {
  if (indexBrand === brandCarrousel.children.length - 1) {
    indexBrand = 0;
    console.log(indexBrand);
  } else {
    indexBrand++;
    console.log(indexBrand);
  }
  // onClientWidth();
  slidePerBrands();
};

const prevBrandSlide = () => {
  if (indexBrand === 0) {
    indexBrand = brandCarrousel.children.length - 1; //slideIndex tomara el valor final
    console.log(indexBrand);
  } else {
    indexBrand--;
    console.log(indexBrand);
  }
  slidePerBrands();
};

//Set an interval for the carrousel so it's moving constantly
setInterval(() => {
  next();
  nextBrandSlide();
}, 3000);

const init = () => {
  prevBrand.addEventListener("click", prevBrandSlide);
  nextBrand.addEventListener("click", nextBrandSlide);
  //_____________________________________________//
  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);
};

init();
