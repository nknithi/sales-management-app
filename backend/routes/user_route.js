// Import necessary modules
const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
const { JWT_SECRET } = require('../config');

// User registration route
router.post("/signup", (req, res) => {

    // Destructure user input from request body
    const { firstName, lastName, email, password } = req.body;

    // Check if any mandatory fields are empty
    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }

    // Check if a user with the provided email already exists
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }

            // Hash the password before saving the user
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({ firstName, lastName, email, password: hashedPassword });

                    // Save the new user to the database
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

// User login route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check if any mandatory fields are empty
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }

    // Find the user by email
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }

            // Compare the provided password with the stored hashed password
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {

                        // Create a JWT token if passwords match
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);

                        // Create user info object without the password
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "firstName": userInDB.firstName, "lastName": userInDB.lastName };

                        // Send the JWT token and user info in the response
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

// Export the router to be used in the main application
module.exports = router;