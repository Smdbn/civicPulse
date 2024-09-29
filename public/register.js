document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      window.location.href = "index.html"; // Redirect to login page
    } else {
      const errorMessage = await response.json();
      alert(
        "Registration failed: " + (errorMessage.message || "Please try again.")
      );
    }
  });
