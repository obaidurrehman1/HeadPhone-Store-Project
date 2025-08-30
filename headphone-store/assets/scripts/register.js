const registerForm = document.querySelector(".register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // validation fails for empty fields or invalid email format
  if (!registerForm.checkValidity()) {
    registerForm.reportValidity();
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Check if email already exists
  if (localStorage.getItem(email)) {
    alert("Email with this account already exists. Please log in.");
    return;
  }

  // Create user object
  const user = {
    username: username,
    email: email,
    password: password
  };

  // Store user in localStorage
  localStorage.setItem(email, JSON.stringify(user));

  alert("Registration successful! Redirecting to login page...");
  window.location.href = "login.html";
});
