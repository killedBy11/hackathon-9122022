const validator = require('../validator/userValidator');
const crypto = require('crypto-js');
const randomstring = require('randomstring');

const registerUser = async (db, email, name, password) => {
    await validator(email, name, password);

    const customer = db.Customer.build({
        email: email,
        name: name,
        password: crypto.SHA256(password).toString(),
        balance: 0
    });

    await customer.save();
}

const generateTokens = async (db, customerId) => {
    db.Token.destroy({
        where: {
            customer_id: customerId
        }
    });

    const token = crypto.SHA256(randomstring.generate(Math.floor(Math.random()) % 10 + 5)).toString();
    const refreshToken = crypto.SHA256(randomstring.generate(Math.floor(Math.random()) % 10 + 5)).toString();

    const tokenObject = db.Token.build({
        token: token,
        refresh_token: refreshToken,
        customer_id: customerId,
        expiration: new Date()
    });

    await tokenObject.save();

    return {
        token: token,
        refreshToken: refreshToken,
        expiration: tokenObject.expiration
    };
}

const login = async (db, email, password) => {
    const passwordHash = crypto.SHA256(password).toString();
    const customer = await db.Customer.findOne({
        where: {
            email: email,
            password: passwordHash
        }
    });
    if (customer === null || customer === undefined) {
        throw new Error("invalid credentials");
    }
    return generateTokens(db, customer.getDataValue('customer_id'));
}

const refreshTokens = async (db, token, refreshToken) => {
    const oldToken = await db.Token.findOne({
        where: {
            token: token,
            refresh_token: refreshToken
        }
    });

    if (oldToken === null || oldToken === undefined) {
        throw new Error('invalid tokens');
    }

    const oldTokenCreationDate = oldToken.getDataValue('expiration');
    let maxRefreshTokenDate = oldToken.getDataValue('expiration');
    maxRefreshTokenDate.setSeconds(maxRefreshTokenDate.getSeconds() + process.env.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS);

    if (Date.now() >= maxRefreshTokenDate) {
        throw new Error("refresh token expired");
    }

    return generateTokens(db, oldToken.getDataValue('customer_id'));
}

const checkToken = async (db, token) => {
    const oldToken = await db.Token.findOne({
        where: {
            token: token
        }
    });

    if (oldToken === null || oldToken === undefined) {
        throw new Error('invalid tokens');
    }

    const oldTokenCreationDate = oldToken.getDataValue('expiration');
    let maxTokenDate = oldToken.getDataValue('expiration');
    maxTokenDate.setSeconds(maxTokenDate.getSeconds() + process.env.TOKEN_EXPIRATION_TIME_IN_SECONDS);

    if (Date.now() >= maxTokenDate) {
        throw new Error("token expired");
    }
}

module.exports.registerUser = registerUser;
module.exports.generateTokens = generateTokens;
module.exports.login = login;
module.exports.refreshTokens = refreshTokens;
module.exports.checkTokens = checkToken;