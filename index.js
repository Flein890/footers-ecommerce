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
const closeMenu = document.querySelector(".cancel");
const closeCart = document.querySelector(".cancel-cart");
const productsContainer = document.querySelector(".products--container");
const showMoreBtn = document.querySelector("#show-more");
const categoriesBtn = document.querySelectorAll(".category-btn");
const categoriesList = document.querySelector(".categories");

/* --------- Logica filtros ---------- */
// Funcion para cambiar el estado de los botones de las categorias
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesBtn];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }

    categoryBtn.classList.add("active");
  });
};

const setShowMoreVisibility = () => {
  if (appState.activeFilter) {
    showMoreBtn.style.display = "none";
    return;
  }

  showMoreBtn.style.display = "block";
};

// Funcion para cambiar el estado del filtro activo
const changeFiltersState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
  // showMoreBtn.style.display = "none";
};

// Funcion para filtrar los productos
const renderFilteredProducts = () => {
  const filteredProducts = data.filter(
    (product) => product.category === appState.activeFilter
  );

  renderProducts(filteredProducts);
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category-btn") &&
    !element.classList.contains("active")
  );
};
// Funcion para aplicar filtro
const applyFilter = ({ target }) => {
  // console.log(target);
  if (!isInactiveFilterBtn(target)) return;
  changeFiltersState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
  // console.log(appState.products);
  // console.log(target);
  // showMoreBtn.style.display = "block";
};

//_____________________________________________________________________________________________
const showMoreProducts = () => {
  appState.currentProductIndex += 1;
  renderProducts(appState.products[appState.currentProductIndex]);
  if (appState.currentProductIndex === appState.productsLimit - 1) {
    showMoreBtn.style.display = "none";
  }
};

const templateCard = ({ id, name, price, image }) => {
  return `<div class="card">
  <img
    class="card--img"
    src="${image}"
    alt="${name}"
  />
  <div class="card--info">
    <span class="title">${name}</span>
    <span class="price">$${price}</span>
  </div>
  <button class="btn">
    <img src="Assets/icons/shopping-cart.png" alt="cart" />Add to cart
  </button>
</div>`;
};

const renderProducts = (productsList) => {
  productsContainer.innerHTML += productsList
    .map((e) => templateCard(e))
    .join("");
};
renderProducts(appState.products[0]);

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

const toggleMenu = () => {
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

const toggleCart = () => {
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

const init = () => {
  prevBrand.addEventListener("click", prevBrandSlide);
  nextBrand.addEventListener("click", nextBrandSlide);
  //_____________________________________________//
  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);
  //____________________________________________//
  labelInput.addEventListener("click", toggleMenu);
  cartIcon.addEventListener("click", toggleCart);
  overlay.addEventListener("click", closeAll);
  closeMenu.addEventListener("click", closeAll);
  closeCart.addEventListener("click", closeAll);
  //___________________________________________//
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesList.addEventListener("click", applyFilter);
};

init();
