const publicOccupationValidator = async (db, spotId, autoId, tensOfMinutes, token) => {
    if (tensOfMinutes > 18 || tensOfMinutes < 1) {
        throw new Error('invalid parking duration');
    }

    const spot = await db.ParkingSpot.findByPk(spotId);
    if (spot === null || spot === undefined) {
        throw new Error('invalid parking duration');
    }

    const automobile = await db.Automobile.findByPk(autoId);

    if (automobile === null || automobile === undefined) {
        throw new Error('invalid automobile id');
    }

    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    if (tokenEntity === null || tokenEntity === undefined) {
        throw new Error('invalid token');
    }
}

module.exports = publicOccupationValidator;