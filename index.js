const newTitle = document.querySelector(".new-title");
setInterval(() => {
  newTitle.classList.add("animate__heartBeat");
}, 1500);
setInterval(() => {
  newTitle.classList.remove("animate__heartBeat");
}, 3000);

//Menu hamburguesa y carrito

const labelInput = document.querySelector(".label-input");
const navUl = document.querySelector(".nav-ul");
const body = document.querySelector("body");
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const overlay = document.querySelector(".overlay");
//MOUSE
// const cursor = document.querySelector(".cursor");
// const cursorFollow = (e) => {
// cursor.style.top = e.pageY + "px";
// cursor.style.left = e.pageX + "px";
// cursor.setAttribute(
//   "style",
//   "transform: translate(" + e.pageX + "px, " + e.pageY + "px)"
// );
// };

//funciones para que solo se abra un carrito
const toggleOpenedMenu = () => {
  if (navUl.classList.contains("translate-cart")) {
    body.classList.remove("overflowY");
    navUl.classList.remove("translate-cart");
  }
};
const toggleOpenedCart = () => {
  if (cart.classList.contains("move")) {
    body.classList.remove("overflowY");
    cart.classList.remove("move");
  }
};
//_________________________________________________

const toggleCart = () => {
  navUl.classList.toggle("translate-cart");
  if (navUl.classList.contains("translate-cart")) {
    body.classList.add("overflowY");
    overlay.classList.add("show");
  } else {
    body.classList.remove("overflowY");
    overlay.classList.remove("show");
  }
  toggleOpenedCart();
};

const toggleMenu = () => {
  cart.classList.toggle("move");
  if (cart.classList.contains("move")) {
    body.classList.add("overflowY");
    overlay.classList.add("show");
  } else {
    body.classList.remove("overflowY");
    overlay.classList.remove("show");
  }
  toggleOpenedMenu();
};

const closeAll = () => {
  navUl.classList.remove("translate-cart");
  cart.classList.remove("move");
  overlay.classList.remove("show");
  body.classList.remove("overflowY");
};

labelInput.addEventListener("click", toggleCart);
cartIcon.addEventListener("click", toggleMenu);
overlay.addEventListener("click", closeAll);
