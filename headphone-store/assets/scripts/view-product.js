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
      // Use == to match string ID from URL with number in JSON
      const product = products.find(p => p.id == productId);

      if (!product) {
        document.getElementById("product-details").innerHTML = "<p>Product not found</p>";
        return;
      }

      document.getElementById("product-details").innerHTML = `
        <div class="view-product-card">
          <img src="${product.image}" alt="${product.name}">
          <div class="view-product-info">
            <h2>${product.name}</h2>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
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
      if (existing) existing.quantity += 1;
      else cart.push({ ...product, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
      updateCartCount(); // From main.js
    });
}
