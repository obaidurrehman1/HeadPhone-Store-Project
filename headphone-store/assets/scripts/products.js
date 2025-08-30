// Load products into the products page
document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
  renderProducts();
  setupViewToggle();
  setupProductListeners();
  updateCartCount();
});

// Fetch products
async function loadProducts() {
  const res = await fetch("assets/data/products.json");
  return await res.json();
}

// Render product cards
async function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";
  const products = await loadProducts();

  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="assets/${p.image}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">$${p.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        <a href="viewproduct.html?id=${p.id}" class="view-link">View Details</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Toggle Grid/List view
function setupViewToggle() {
  const container = document.getElementById("products-container");
  document.getElementById("grid-view").addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
  });
  document.getElementById("list-view").addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
  });
}

// Handle Add to Cart
function setupProductListeners() {
  document.getElementById("products-container").addEventListener("click", async (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const id = parseInt(e.target.dataset.id);
      const products = await loadProducts();
      const product = products.find(p => p.id === id);
      addToCart(product);
    }
  });
}

// Cart functions (reusable with cart.js)
function getCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  let cart = getCart();
  const item = cart.find(i => i.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  let el = document.getElementById("cart-item-count");
  if (el) el.textContent = count;
}