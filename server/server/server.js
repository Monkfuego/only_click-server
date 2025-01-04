const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./router"); // Adjust the path if needed

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Connect to MongoDB
const MONGO_URI = "mongodb+srv://ljremi:gGTNbMwTNEENQzdq@cluster0.6ok7t.mongodb.net/"; // Replace with your MongoDB connection string
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

// API routes
app.use("./controllers", userRoutes);

// Global error handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Start the server
const PORT = 8000; // Replace with your desired port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
