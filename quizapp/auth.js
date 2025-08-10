// SIGN UP
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("signup-username").value.trim();
        const password = document.getElementById("signup-password").value.trim();

        if (!username || !password) {
            alert("Please fill all fields.");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(u => u.username === username);
        if (userExists) {
            alert("Username already exists. Please choose a different one.");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! Please log in.");
        window.location.href = "signin.html";
    });
}

// LOGIN
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(user => user.username === username && user.password === password);

        if (matchedUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", username); // Optional: Track who logged in
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password!");
        }
    });
}

// QUIZ ACCESS CONTROL
if (window.location.pathname.includes("quiz.html")) {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
        alert("Please log in first.");
        window.location.href = "signin.html";
    }
}

// LOGOUT FUNCTION
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    alert("Logged out successfully.");
    window.location.href = "signin.html";
}
