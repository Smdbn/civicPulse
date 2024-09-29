document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const token = data.token; // Extract token from response
    localStorage.setItem("token", token); // Store token
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    const errorMessage = await response.json();
    alert("Login failed: " + errorMessage.message);
  }
});
