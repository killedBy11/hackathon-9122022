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

router.post('/register-vehicle', async (req, res, next) => {
    const toSend = await middleware(async () => (await vehicleController.registerVehicle(db, req.body.registrationPlate, req.body.fuelId, req.body.pollutionStandard, req.body.token)), db, req.body.token);
    res.status(toSend[0]).json(toSend[1]);
});

module.exports = router;