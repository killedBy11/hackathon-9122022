const {checkTokens} = require("../controller/authenticationController");

const middleware = async (trigger, db, token) => {
    if (token === null || token === undefined) {
        return [401, null];
    }

    try {
        await checkTokens(db, token);
        return [200, await trigger()];
    } catch (e) {
        return [401, null];
    }
}

module.exports = middleware;