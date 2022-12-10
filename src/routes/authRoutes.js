const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authController = require('../controller/authenticationController');

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

module.exports = router;