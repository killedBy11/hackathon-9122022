const {Op} = require('sequelize');

const parseParkingDTO = parking => ({
    lat: parking.getDataValue('latitude'),
    lng: parking.getDataValue('longitude'),
    name: parking.getDataValue('name'),
    id: parking.getDataValue('park_id')
});

const retrievePublicParkingInRange = async (db, latitude, longitude, range) => {
    const rng = range > process.env.MAX_RANGE ? process.env.MAX_RANGE : range;
    const parkings = await db.Parking.findAll({
        where: {
            latitude: {
                [Op.lt]: latitude + rng / process.env.RANGE_MULTIPLIER,
                [Op.gt]: latitude - rng / process.env.RANGE_MULTIPLIER,
            },
            longitude: {
                [Op.lt]: longitude + rng / process.env.RANGE_MULTIPLIER,
                [Op.gt]: longitude - rng / process.env.RANGE_MULTIPLIER,
            }
        }
    });
    let data = [];
    parkings.forEach(parking => {
        data.push(parseParkingDTO(parking));
    });
    return data;
}

const retrievePrivateParkingInRange = async () => {
    return [];
}

const parseDetailedParkingInformation = async (db, id) => {
    const parking = await db.Parking.findByPk(id);
    const spots = await db.ParkingSpot.findAll({
        where: {
            park_id: id
        }
    });

    let occupied = {
        regular: 0,
        handicaped: 0,
        ev: 0
    };

    let total = {
        regular: 0,
        handicaped: 0,
        ev: 0
    };

    let price = {
        regular: 0,
        handicaped: 0,
        ev: 0
    }

    let reservation_price = {
        regular: 0,
        handicaped: 0,
        ev: 0
    }

    let reservable = {
        regular: 0,
        handicaped: 0,
        ev: 0
    }

    for (const spot of spots) {
        const o = await db.OccupiedPublicSpot.findAll({
            where: {
                spot_id: spot.getDataValue('spot_id'),
                end: null
            }
        });
        if (spot.getDataValue('spot_type') === "REGULAR") {
            occupied.regular += o.length;
            total.regular += spot.getDataValue('quantity');
            price.regular = spot.getDataValue('price');
            reservation_price.regular = spot.getDataValue('reservation_price');
            reservable.regular = spot.getDataValue('reservable');
        } else if (spot.getDataValue('spot_type') === "DISABLED") {
            occupied.handicaped += o.length;
            total.handicaped += spot.getDataValue('quantity');
            price.handicaped = spot.getDataValue('price');
            reservation_price.handicaped = spot.getDataValue('reservation_price');
            reservable.handicaped = spot.getDataValue('reservable');
        } else if (spot.getDataValue('spot_type') === "EV") {
            occupied.ev += o.length;
            total.ev += spot.getDataValue('quantity');
            price.ev = spot.getDataValue('price');
            reservation_price.ev = spot.getDataValue('reservation_price');
            reservable.ev = spot.getDataValue('reservable');
        }
    }

    const activeDays = parking.getDataValue('active_days');

    let schedule = [];

    for (let i = 0; i < 7; ++i) {
        if (!((activeDays >>> i) & 1)) {
            schedule.push(undefined);
            continue;
        }
        schedule.push({
            begin: parking.getDataValue('begin_day' + i),
            end: parking.getDataValue('end_day' + i)
        });
    }

    return {
        id: id,
        name: parking.getDataValue('name'),
        lat: parking.getDataValue('latitude'),
        lng: parking.getDataValue('longitude'),
        regular: {
            total: total.regular,
            occupied: occupied.regular,
            price: price.regular,
            reservation_price: reservation_price.regular,
            reservable: reservable.regular,
        },
        handicaped: {
            total: total.handicaped,
            occupied: occupied.handicaped,
            price: price.handicaped,
            reservation_price: reservation_price.handicaped,
            reservable: reservable.handicaped,
        },
        ev: {
            total: total.ev,
            occupied: occupied.ev,
            price: price.ev,
            reservation_price: reservation_price.ev,
            reservable: reservable.ev,
        },
        dailySchedule: schedule
    };
};

const getReservationsForDay = async (db, day, id) => {
    const parking = await db.Parking.findByPk(id);
    const spots = await db.ParkingSpot.findAll({
        where: {
            park_id: id
        }
    });

    let reservations = [];

    const date = new Date(day);
    const nextDate = new Date();
    nextDate.setDate(date.getDate() + 1);

    for (let spot of spots) {
        if (!spot.getDataValue('reservable')) {
            reservations.push(undefined);
            continue;
        }
        const todays = await db.Reservation.findAll({
            where: {
                spot_id: spot.getDataValue('spot_id'),
                begin_time: {
                    [Op.gte]: date,
                    [Op.lt]: nextDate
                }
            }
        });

        reservations.push({
            spot: spot,
            reservations: todays
        });
    }
    return reservations;
}

module.exports.retrievePublicParkingInRange = retrievePublicParkingInRange;
module.exports.retrievePrivateParkingInRange = retrievePrivateParkingInRange;
module.exports.parseDetailedParkingInformation = parseDetailedParkingInformation;
module.exports.getReservationsForDay = getReservationsForDay;