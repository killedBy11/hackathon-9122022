const express = require('express');
const router = express.Router();
const db = require('../database/db');
const parkingController = require('../controller/parkingController');

router.get('/search', (req, res) => {
    res.send("search");
});

router.post('/fetch-parking', async (req, res, next) => {
    const result = {
        public: await parkingController.retrievePublicParkingInRange(db, req.body.lat, req.body.lng, req.body.range),
        private: await parkingController.retrievePrivateParkingInRange()
    };
    res.status(200).json({result});
});

router.get('/fetch-parking/:id', async (req, res, next) => {
    const id = req.params.id;
    const result = await parkingController.parseDetailedParkingInformation(db, id);
    res.status(200).json({result});
});

module.exports = router;