// Select the form
const registerForm = document.querySelector(".register-form");


const passwordField = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("show-password");

// Listen for form submission
registerForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default submission

  const email = document.getElementById("email").value.trim();
  const password = passwordField.value;

  // built-in validation
  if (!registerForm.checkValidity()) {
    // If inputs are invalid, show default browser validation
    registerForm.reportValidity();
    return;
  }
  
  // check if user exists
  const storedUser = JSON.parse(localStorage.getItem(email));

  if (!storedUser) {
    alert("No account found with this email. Please register first.");
    return;
  }

  if (storedUser.password !== password) {
    alert("Incorrect password. Please try again.");
    return;
  }

  alert("Login successful! Redirecting to homepage...");
  window.location.href = "index.html";
});

// show passord functionality
showPasswordCheckbox.addEventListener("change", () => {
  const type = showPasswordCheckbox.checked ? "text" : "password";
  passwordField.type = type;
});