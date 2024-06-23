// Import the mongoose module to interact with MongoDB
const mongoose = require('mongoose');


// Define the schema for a user
const userSchema = new mongoose.Schema({

    // Field for the user's first name, required and must be a string
    firstName: {
        type: String,
        required: true
    },

    // Field for the user's last name, required and must be a string
    lastName: {
        type: String,
        required: true
    },

    // Field for the user's email, required, must be a string, and must be unique across the collection
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Field for the user's password, required and must be a string
    password: {
        type: String,
        required: true
    }
});

// Register the UserModel with the schema defined above
mongoose.model("UserModel", userSchema);