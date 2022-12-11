const validator = require('../validator/vehicleValidator');

const registerVehicle = async (db, registrationPlate, fuel, pollutionStandard, token) => {
    validator(db, registrationPlate, pollutionStandard, fuel);

    const tokenElement = await db.Token.findOne({
        where: {
            token: token
        }
    });

    const vehicle = db.Automobile.build({
        registration_plate: registrationPlate,
        fuel_id: fuel,
        pollution_standard: pollutionStandard,
        customer_id: tokenElement.getDataValue('customer_id')
    });

    await vehicle.save();

    return null;
}

const getFuelTypes = async (db) => {
    const fuels = await db.FuelType.findAll();

    let fuelTypes = [];

    for (const fuel of fuels) {
        fuelTypes.push({
            fuelId: fuel.getDataValue('fuel_id'),
            name: fuel.getDataValue('name')
        });
    }
    return {
        fuels: fuelTypes
    };
}

module.exports.registerVehicle = registerVehicle;
module.exports.getFuelTypes = getFuelTypes;