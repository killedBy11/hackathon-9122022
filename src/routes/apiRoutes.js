const express = require('express');
const router = express.Router();
const db = require('../database/db');
const parkingController = require('../controller/parkingController');

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

router.post('/fetch-parking/:id/reservations', async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await parkingController.getReservationsForDay(db, req.body.date, id);
    res.status(200).json({result});
});

module.exports = router;