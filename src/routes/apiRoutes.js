const express = require('express');
const router = express.Router();

router.get('/search', (req, res) => {
    res.send("search");
});

router.post('/fetch-parking', (req, res) => {
    console.dir(req.body);
    res.send("proba");
});

module.exports = router;