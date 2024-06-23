
// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");


const salesEntrySchema = new mongoose.Schema({

    // Field for the product name, required and must be a string
    productName: {
        type: String,
        required: true
    },

    // Field for the quantity of the product, required, must be a number, and must be at least 1
    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    // Field for the price of the product, required, must be a number, and must be at least 0.01
    price: {
        type: Number,
        required: true,
        min: 0.01
    },

    // Field for the creation date of the sales entry, defaults to the current date and time
    createdAt: {
        type: Date,

        // Automatically set the current date and time
        default: Date.now
    }
});

// Register the SalesEntry model with the schema defined above
mongoose.model("SalesEntry", salesEntrySchema);