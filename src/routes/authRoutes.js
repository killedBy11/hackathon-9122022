const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authController = require('../controller/authenticationController');
const vehicleController = require('../controller/vehicleController');
const middleware = require('../middlewares/checkUserAuthenticated');

router.post('/register', async (req, res, next) => {
    try{
        await authController.registerUser(db, req.body.email, req.body.name, req.body.password);
        res.status(200).json(null);
    } catch (e) {
        res.status(403).json({
            token: null,
            refreshToken: null,
            expiration: null,
            errorMessage: e.message
        });
    }
});

router.post('/login', async (req, res, next) => {
    try{
        const result = await authController.login(db, req.body.email, req.body.password);
        res.status(200).json(result);
    } catch (e) {
        res.status(403).json({
            token: null,
            refreshToken: null,
            expiration: null,
            errorMessage: e.message
        });
    }
});

router.post('/refresh-token', async (req, res, next) => {
    try{
        const result = await authController.refreshTokens(db, req.body.token, req.body.refreshToken);
        res.status(200).json(result);
    } catch (e) {
        res.status(403).json({
            token: null,
            refreshToken: null,
            expiration: null,
            errorMessage: e.message
        });
    }
});

router.post('/get-fuels', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.getFuelTypes(db)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

router.post('/register-vehicle', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.registerVehicle(db, req.body.registrationPlate, req.body.fuelId, req.body.pollutionStandard, req.body.token)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

router.post('/get-vehicles', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.getVehicles(db, req.body.token)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

router.post('/make-reservation', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.makeReservation(db, req.body.autoId, req.body.parkingId, req.body.type, req.body.beginTime, req.body.endTime, req.body.token)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

router.post('/occupy-spot', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.occupyPublicSpot(db, req.body.autoId, req.body.spotId, req.body.tensOfMinutes, req.body.token)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

router.post('/get-balance', async (req, res, next) => {
    const toSend = await middleware(async () => {
        const t = await db.Token.findOne({
            where: {
                token: req.body.token
            }
        });
        const c = await db.Customer.findByPk(t.getDataValue('customer_id'));
        return {
            balance: c.getDataValue('balance')
        };
    }, db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

module.exports = router;