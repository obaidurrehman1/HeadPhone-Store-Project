document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
  renderCartItems();
  updateCartCount();
});

// Get cart
function getCart() {
  return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  let el = document.getElementById("cart-item-count");
  if (el) el.textContent = count;
}

// Render cart items
function renderCartItems() {
  const container = document.getElementById("cart-items");
  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    calculateTotals();
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="assets/${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-details">
        <h4>${item.name}</h4>
        <span>$${item.price.toFixed(2)}</span>
      </div>
      <div class="quantity-controls">
        <button data-id="${item.id}" data-action="decrease">-</button>
        <input type="text" value="${item.quantity}" readonly>
        <button data-id="${item.id}" data-action="increase">+</button>
      </div>
      <button class="remove-item-btn" data-id="${item.id}">Remove</button>
    `;
    container.appendChild(div);
  });

  calculateTotals();
  setupCartListeners();
}

// Cart actions
function setupCartListeners() {
  document.getElementById("cart-items").addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);
    if (e.target.dataset.action === "increase") updateQuantity(id, 1);
    if (e.target.dataset.action === "decrease") updateQuantity(id, -1);
    if (e.target.classList.contains("remove-item-btn")) removeFromCart(id);
  });
}

function updateQuantity(id, change) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    renderCartItems();
    updateCartCount();
  }
}

function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCartItems();
  updateCartCount();
}

// Totals
function calculateTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  document.getElementById("subtotal-price").textContent = subtotal.toFixed(2);
  document.getElementById("tax-price").textContent = tax.toFixed(2);
  document.getElementById("total-price").textContent = total.toFixed(2);
}



function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  let el = document.getElementById("cart-item-count");
  if (el) el.textContent = count;
}
