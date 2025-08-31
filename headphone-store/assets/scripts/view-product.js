document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!productId) {
    document.getElementById("product-details").innerHTML = "<p>Product not found</p>";
    return;
  }

  fetch("assets/data/products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);

      if (!product) {
        document.getElementById("product-details").innerHTML = "<p>Product not found</p>";
        return;
      }

      document.getElementById("product-details").innerHTML = `
        <div class="product-detail">
          <div class="product-image-wrapper">
            <img src="assets/${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h2>${product.name}</h2>
            <p class="product-description">${product.description || "No description available."}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="product-actions">
              <button id="addToCartBtn" onclick="addToCart(${product.id})">Add to Cart</button>
              <a href="product.html" class="view-link">← Back to Products</a>
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error("Error loading product:", err);
      document.getElementById("product-details").innerHTML = "<p>Error loading product</p>";
    });
});

function addToCart(productId) {
  fetch("assets/data/products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (!product) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
      updateCartCount(); 
    });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  let el = document.getElementById("cart-item-count");
  if (el) el.textContent = count;
}