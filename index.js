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
const cartBubbleCounter = document.querySelector(".cart-counter");
const cartTotal = document.querySelector(".cart-price--total");
const buy = document.querySelector(".cart-btn");
const cartItemsContainer = document.querySelector(".cart-items_container");
const cartItemQuantity = document.querySelector(".cart-item--quantity");
const newTitle = document.querySelector(".new-title");

setInterval(() => {
  newTitle.classList.add("animate__heartBeat");
}, 1500);
setInterval(() => {
  newTitle.classList.remove("animate__heartBeat");
}, 3000);

//Function to save items to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("items", JSON.stringify(items));
};

//get items from localStorage
let items = JSON.parse(localStorage.getItem("items")) || [];

const cartProductTemplate = ({ id, image, name, price, quantity }) => {
  return `<div class="cart-item">
  <img
    class="cart-item--img"
    src="${image}"
    alt=""
  />
  <div class="cart-item--info">
    <span class="cart-item--title"
      >${name}</span
    >
    <div class="cart-item--quantities">
      <div class="quantities">
        <button class="quantity-handler minus" data-id=${id}>-</button>
        <span class="cart-item--quantity">${quantity}</span>
        <button class="quantity-handler plus" data-id=${id}>+</button>
      </div>
      <span class="cart-item--price">$${price}</span>
    </div>
  </div>
</div>`;
};

const getCartTotal = () => {
  return items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
};
const showCartTotal = () => {
  cartTotal.innerText = `$${getCartTotal().toFixed(2)}`;
};

const changeBubbleCount = () => {
  cartBubbleCounter.innerText = items.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

const renderCart = () => {
  if (!items.length) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    return;
  }
  cartItemsContainer.innerHTML = items.map(cartProductTemplate).join("");
};

const updateCartState = () => {
  saveToLocalStorage();
  renderCart();
  isEmptyCart();
  showCartTotal();
  changeBubbleCount();

};
const addProduct = (event) => {
  if (!event.target.classList.contains("btn")) return;
  const product = event.target.dataset;
  if (existsInCart(product)) {
    addUnitsToProduct(product);
  } else {
    createCartProduct(product);
  }
  updateCartState();
  // saveToLocalStorage();
  // console.log(items);
};
const isEmptyCart = () => {
  if (!items.length) {
    buy.classList.add("disabled");
  } else {
    buy.classList.remove("disabled");
  }
};

const addUnitsToProduct = (product) => {
  items = items.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

//CREATE ITEM FOR CART
const createCartProduct = (product) => {
  items = [...items, { ...product, quantity: 1 }];
};

//DETERMINE IF A PRODUCT ALREADY EXISTS
const existsInCart = (product) => {
  return items.find((item) => item.id === product.id);
};

const minusItem = (id) => {
  const productInCart = items.find((item) => item.id === id);
  // if (productInCart.quantity >= 1) {
  items = items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
  );
  if (productInCart.quantity === 1) {
    if (window.confirm("Are you sure you want to remove this item?")) {
      // if the quantity is 1, remove the item from the cart
      items = items.filter((item) => item.id !== id);
    } else {
      items = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
  }
  return;
};

const plusItem = (id) => {
  // Find the item in the cart with the given ID
  const productInCart = items.find((item) => item.id === id);

  // Increment the quantity of the item
  addUnitsToProduct(productInCart);
};
const quantityHandler = (e) => {
  if (e.target.classList.contains("plus")) {
    plusItem(e.target.dataset.id);
  } else if (e.target.classList.contains("minus")) {
    minusItem(e.target.dataset.id);
  }
  updateCartState();
};

//----------------------------------FILTROS---------------------------------//

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesBtn];
  categories.forEach((categoryBtn) => {
    // Remove the "active" class from buttons with a different category
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    // Add the "active" class to the button with the selected category
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

//FILTER STATE
const changeFiltersState = (btn) => {
  // Update the active filter in the application state
  appState.activeFilter = btn.dataset.category;
  // Change the active state of the buttons based on the active filter
  changeBtnActiveState(appState.activeFilter);
  // Update the visibility of the "show more" section based on the active filter
  setShowMoreVisibility(appState.activeFilter);
};

//FILTER PRODUCTS
const renderFilteredProducts = () => {
  // Filter the products based on the active filter
  const filteredProducts = data.filter(
    (product) => product.category === appState.activeFilter
  );
  // Render the filtered products
  renderProducts(filteredProducts);
};

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category-btn") &&
    !element.classList.contains("active")
  );
};
// Funcion para aplicar filtro
const applyFilter = (event) => {
  // Checks if the filter button is not inactive
  if (!isInactiveFilterBtn(event.target)) return;
  // Changes the state of the filters
  changeFiltersState(event.target);
  // Clears the products container
  productsContainer.innerHTML = "";
  // Renders the filtered products if an active filter is set
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  // Renders the products using the first set of products
  renderProducts(appState.products[0]);
};

//_____________________________________________________________________________________________
const showMoreProducts = () => {
  // Increase the current product index by 1
  appState.currentProductIndex += 1;
  // Render the next product
  renderProducts(appState.products[appState.currentProductIndex]);
  // Check if the current product index has reached the products limit
  if (appState.currentProductIndex === appState.productsLimit - 1) {
    // Hide the "Show More" button
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
  <button class="btn" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}">
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

//FUNCTION TO OPEN AND CLOSE CART AND MENU OR VICEVERSA
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
  //___________________________________________//
  document.addEventListener("DOMContentLoaded", renderCart);
  cartItemsContainer.addEventListener("click", quantityHandler);
  document.addEventListener("DOMContentLoaded", isEmptyCart);
  productsContainer.addEventListener("click", addProduct);
  //___________________________________________//
  document.addEventListener("DOMContentLoaded", updateCartState);
};

init();

// console.log(items)