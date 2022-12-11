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
})

module.exports = router;