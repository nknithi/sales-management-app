// Import necessary modules
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const SalesEntry = mongoose.model("SalesEntry");
const protectedRoute = require("../middleware/protectedResource");

// Get all sales entries
router.get("/allsales", protectedRoute, (req, res) => {
    SalesEntry.find()
        .then((salesEntries) => {
            res.status(200).json({ salesEntries });
        })
        .catch((error) => {
            console.error("Error retrieving sales entries:", error);
            res.status(500).json({ error: "Internal server error" });
        });
});

// Get today's total revenue
router.get("/todaystotalrevenue", protectedRoute, (req, res) => {
    // Get today's date
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Find sales entries for today
    SalesEntry.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay }
    }).then((salesEntries) => {
        // Calculate total revenue for today
        const totalRevenue = salesEntries.reduce((total, entry) => total + (entry.quantity * entry.price), 0);
        // Send today's total revenue in the response
        res.status(200).json({ totalRevenue });
    }).catch((error) => {
        console.error("Error retrieving today's total revenue:", error);
        res.status(500).json({ error: "Internal server error" });
    });
});

// Get top 5 sales for today
router.get("/top5salesfortoday", protectedRoute, (req, res) => {
    // Get today's date
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Find sales entries for today
    SalesEntry.find({
        createdAt: { $gte: startOfDay, $lt: endOfDay }
    }).sort({ price: -1 }).limit(5)
        .then((salesEntries) => {
            // Send top 5 sales for today in the response
            res.status(200).json({ topSales: salesEntries });
        }).catch((error) => {
            console.error("Error retrieving top 5 sales for today:", error);
            res.status(500).json({ error: "Internal server error" });
        });
});



// Add new sales entry
router.post("/addsale", protectedRoute, (req, res) => {
    const { productName, quantity, price } = req.body;

    // Log incoming request body
    console.log("Request Body:", req.body);

    if (!productName || !quantity || !price) {
        // Log error if mandatory fields are empty
        console.error("One or more mandatory fields are empty:", req.body);
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }

    // Remove password from user object to avoid leaking sensitive information
    req.user.password = undefined;

    // Create a new sales entry
    const salesEntry = new SalesEntry({ productName, quantity, price });

    // Save the new sales entry to the database
    salesEntry.save()
        .then((newSalesEntry) => {
            // Log successful creation of sales entry
            console.log("New sales entry created:", newSalesEntry);
            res.status(201).json({ salesEntry: newSalesEntry });
        })
        .catch((error) => {
            // Log any errors that occur during saving
            console.error("Error creating sales entry:", error);
            res.status(500).json({ error: "Internal server error" });
        });
});




// Delete a sales entry
router.delete("/deletesale/:saleId", protectedRoute, (req, res) => {
    SalesEntry.findByIdAndRemove(req.params.saleId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Sales entry not found" });
            }
            res.status(200).json({ result: data });
        })
        .catch((error) => {
            console.error("Error deleting sales entry:", error);
            res.status(500).json({ error: "Internal server error" });
        });
});

module.exports = router;
