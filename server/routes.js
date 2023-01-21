// const Model = require('./model');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('./model');
const TOKEN_KEY = process.env.TOKEN_KEY || 'TOKEN_KEY';

// Register
router.post("/register", async (req, res) => {
    try {
        // Get user input
        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            console.log('error: "All input is required"')
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            console.log('error: "User Already Exist. Please Login"')
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = password;
        // encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        // if (user && (await bcrypt.compare(password, user.password))) {
        if (user && (password == user.password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email }, // jwt payload
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

const auth = require("./auth");

function parseJwt(token) {
    const base64String = token.split('.')[1];
    const decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
    // console.log(decodedValue);
    return decodedValue;

    // - Client-side decryption
    // var base64Url = token.split('.')[1];
    // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // JSON.parse(Buffer.from(base64,'base64').toString('ascii'));
    // var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    // }).join(''));

    // return JSON.parse(jsonPayload);
}

router.get("/welcome", auth, async (req, res) => {
    email = parseJwt(req.headers["x-access-token"]).email
    const user = await User.findOne({ email });
    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        message: "Welcome 🙌 "
    });
});

module.exports = router;