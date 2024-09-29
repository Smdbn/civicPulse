const express = require("express");
const cors = require("cors");
const { connectDB } = require("./backend/config/db");
const reportRoutes = require("./backend/routes/reportRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const path = require("path");
const session = require("express-session");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Load environment variables from .env file
dotenv.config();

// Verify environment variables
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Failed to connect to the database:", error);
    return;
  }
  console.log("Connected to the MySQL database!");
});

// Connect to MySQL
connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse URL-encoded and JSON request bodies
app.use(
  cors({
    origin: ["http://localhost:5000"], // Allow only specific origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure session middleware
app.use(
  session({
    name: "session_cookie_name", // Use 'name' instead of 'key'
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Helps prevent cross-site scripting (XSS) attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// Serve the home/login page as the landing page
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// Serve the registration page
app.get("/register", (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "public") });
});

// Serve the dashboard page
app.get("/dashboard", (req, res) => {
  if (req.session.user && req.session.user.id) {
    res.sendFile("dashboard.html", { root: path.join(__dirname, "public") });
  } else {
    res.redirect("/index");
  }
});

// Use routes
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes); // User routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
