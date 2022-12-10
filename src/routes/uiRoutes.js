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

router.get('/map', (req, res) => {
    res.send("map page");
});

router.get('/parking', (req, res) => {
   res.send("parking");
});

router.get("/parking/schedule", (req, res) => {
    res.send("schedule parking");
});

module.exports = router;