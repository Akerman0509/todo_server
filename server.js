require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./utils/connect");
const routes = require("./routes/index.route");

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials like cookies, authorization headers
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello from backend server!");
});
// Routes
app.use("/api/v1", routes);

// Start the server
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is on http://localhost:${process.env.PORT}`);
});