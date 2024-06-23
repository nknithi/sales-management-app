// Import necessary modules
const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config')

// Set global base directory for the application
global.__basedir = __dirname;

// Connect to MongoDB using the provided URL
mongoose.connect(MONGODB_URL);

// Event listener for successful MongoDB connection
mongoose.connection.on('connected', () => {
    console.log("DB connected");
})
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB");
})

// Import models to register them with Mongoose
require('./models/user_model');
require('./models/sales_model');


// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Use middleware to parse JSON request bodies
app.use(express.json());


// Define routes for the application
app.use(require('./routes/user_route'));
app.use(require('./routes/sales_route'));

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log("Server started");
});