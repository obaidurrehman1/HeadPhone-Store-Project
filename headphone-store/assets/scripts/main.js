// function to correctly select the heders section
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop();

  // navbar link highlight
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href").split("/").pop();
    if (href && href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // navbar buttons highlight
  // const buttons = document.querySelectorAll(".header-actions button");
  // buttons.forEach((btn) => {
  //   const target = btn.getAttribute("onclick");
  //   if (target && target.includes(currentPage)) {
  //     btn.classList.add("active");
  //   } else {
  //     btn.classList.remove("active");
  //   }
  // });
}

// adjusting the navbars when clicking on resgister or login button
function adjustHeaderElements() {
  const currentPage = window.location.pathname.split("/").pop();
  const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const nav = document.querySelector(".main-nav");
  const search = document.querySelector(".search-bar");

  if (currentPage === "register.html") {
    if (registerBtn) registerBtn.style.display = "none";
    if (nav) nav.style.display = "none";
    if (search) search.style.display = "none";
  } else if (currentPage === "login.html") {
    if (loginBtn) loginBtn.style.display = "none";
    if (nav) nav.style.display = "none";
    if (search) search.style.display = "none";
  } else if (currentPage === "about.html") {
    if (nav) nav.style.display = "none";
    if (search) search.style.display = "none";
  }
}

// Load header and footer
function loadPartials() {
  fetch("commons/headers.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      setActiveNav();
      adjustHeaderElements();
    });

  fetch("commons/footer.html")
    .then((res) => res.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
}

// all products array
let allProducts = [];

function renderProducts(products) {
  const grid = document.getElementById("featured-products");
  grid.innerHTML = ""
  products.forEach((p) => {
    const card = `
      <div class="featured-product-card">
        <img src="assets/${p.image}" alt="${p.name}" class="featured-product-image">
        <h3 class="featured-product-name">${p.name}</h3>
        <p class="featured-product-price">$${p.price}</p>
        <a href="viewproduct.html?id=${p.id}" class="featured-product-view-btn">View</a>
      </div>
    `;
    grid.innerHTML += card;
  });
}

function loadProducts() {
  fetch("assets/data/products.json")
    .then((res) => res.json())
    .then((products) => {
      allProducts = products;
      renderProducts(allProducts); // initial render
    })
    .catch((err) => console.error("Error loading products:", err));
}

let hasScrolledToFeatured = false;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  loadPartials();
  loadProducts();

  // search featured products
  document.addEventListener("input", (e) => {
    if (e.target.classList.contains("search-bar")) {
      const term = e.target.value.toLowerCase();
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(term)
      );
      renderProducts(filtered);

      const section = document.querySelector(".featured-products-section");
      if (section && !hasScrolledToFeatured && term.length > 0) {
        section.scrollIntoView({ behavior: "smooth" });
        hasScrolledToFeatured = true;
      }
      if (term.length === 0) {
        hasScrolledToFeatured = false;
      }
    }
  });
});
