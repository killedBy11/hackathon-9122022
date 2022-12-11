const vehicleValidator = async (db, registrationPlate, pollutionStandard, fuel) => {
    if(!(/[A-Z0-9]+/.test(registrationPlate))) {
        throw new Error("invalid registration");
    }

    if (pollutionStandard < 0 || pollutionStandard > 7) {
        throw new Error("invalid pollution standard");
    }

    const f = await db.FuelType.findOne({
        where: {
            fuel_id: fuel
        }
    });

    if (f === null || f === undefined) {
        throw new Error("invalid fuel");
    }
}

module.exports = vehicleValidator;