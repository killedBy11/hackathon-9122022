const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello!');
});

router.get('/login', (req, res) => {
    res.send("login form");
});

router.get('/register', (req, res) => {
    res.send("registration form");
});

router.get('/register-vehicle', (req, res) => {
    res.send("vehicle registration form");
});

module.exports = router;