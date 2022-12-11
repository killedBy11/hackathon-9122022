const validator = require('../validator/vehicleValidator');
const reservationValidator = require('../validator/reservationValidator');
const publicOccupationValidator = require('../validator/publicOccupationValidator');
const transbuild = require('../validator/transactionValidator');

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

const getVehicles = async (db, token) => {
    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    if (tokenEntity === undefined || tokenEntity === null) {
        throw new Error("invalid reservation");
    }

    const customer = await tokenEntity.getCustomer();

    const vehicles = await db.Automobile.findAll({
        where: {
            customer_id: customer.getDataValue('customer_id')
        }
    });

    let automobiles = [];

    for (const vehicle of vehicles) {
        automobiles.push({
            autoId: vehicle.getDataValue('auto_id'),
            registrationPlate: vehicle.getDataValue('registration_plate'),
            pollution_standard: vehicle.getDataValue('pollution_standard')
        });
    }
    return {
        vehicles: automobiles
    }
}

const makeReservation = async (db, autoId, parkingId, type, beginTime, endTime, token) => {
    await reservationValidator(db, autoId, parkingId, type, beginTime, endTime, token);
    const spot = await db.ParkingSpot.findOne({
        where: {
            park_id: parkingId,
            spot_type: type
        }
    });
    const trans = await transbuild(db, parkingId, spot.getDataValue('reservation_price'), token);

    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    const reservation = db.Reservation.build({
        begin_time: beginTime,
        end_time: endTime,
        spot_id: spot.getDataValue('spot_id'),
        auto_id: autoId
    });

    const customer = await db.Customer.findOne({
        where: {
            customer_id: tokenEntity.getDataValue('customer_id')
        }
    });
    const updatedRows = await db.Customer.update(
        {
            balance: customer.getDataValue('balance') - trans.getDataValue('value'),
        },
        {
            where: {customer_id: customer.getDataValue('customer_id')},
        }
    );

    await trans.save();
    await reservation.save();
}

const occupyPublicSpot = async (db, autoId, spotId, tensOfMinutes, token) => {
    await publicOccupationValidator(db, autoId, spotId, tensOfMinutes, token);

    const tokenEntity = await db.Token.findOne({
        where: {
            token: token
        }
    });

    const cusomterId = tokenEntity.getDataValue('customer_id');

    const begin = new Date(Date.now());
    const end = new Date(Date.now());
    end.setMinutes(end.getMinutes() + tensOfMinutes * 10);

    const occupation = db.OccupiedPublicSpot.build({
        customer_id: tokenEntity.getDataValue('customer_id'),
        spot_id: spotId,
        auto_id: autoId,
        begin: begin,
        end: end
    });

    const spot = await db.ParkingSpot.findByPk(spotId);

    const trans = await transbuild(db, spot.getDataValue('park_id'), tensOfMinutes * spot.getDataValue('price'), token);

    const customer = await db.Customer.findOne({
        where: {
            customer_id: tokenEntity.getDataValue('customer_id')
        }
    });
    const updatedRows = await db.Customer.update(
        {
            balance: customer.getDataValue('balance') - trans.getDataValue('value'),
        },
        {
            where: {customer_id: customer.getDataValue('customer_id')},
        }
    );
    await trans.save();
    await occupation.save();
}

module.exports.registerVehicle = registerVehicle;
module.exports.getFuelTypes = getFuelTypes;
module.exports.getVehicles = getVehicles;
module.exports.makeReservation = makeReservation;
module.exports.occupyPublicSpot = occupyPublicSpot;
