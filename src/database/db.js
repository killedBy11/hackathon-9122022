const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Parking = require('../models/Parking')(sequelize);
const ParkingSpot = require('../models/ParkingSpot')(sequelize);
const PersonalParkingSpot = require('../models/PersonalParkingSpot')(sequelize);
const Customer = require('../models/Customer')(sequelize);
const Automobile = require('../models/Automobile')(sequelize);
const FuelType = require('../models/FuelType')(sequelize);
const Reservation = require('../models/Reservation')(sequelize);
const Transaction = require('../models/Transaction')(sequelize);
const OccupiedPersonalSpot = require('../models/OccupiedPersonalSpot')(sequelize);
const OccupiedPublicSpot = require('../models/OccupiedPublicSpot')(sequelize);

ParkingSpot.belongsTo(Parking, {foreignKey: 'park_id'});
Parking.hasMany(ParkingSpot, {sourceKey: 'park_id', foreignKey: 'park_id'});

PersonalParkingSpot.belongsTo(Customer, {foreignKey: 'customer_id'});
Customer.hasMany(PersonalParkingSpot, {sourceKey: 'customer_id', foreignKey: 'customer_id'});

Automobile.belongsTo(FuelType, {foreignKey: 'fuel_id'});
Automobile.belongsTo(Customer, {foreignKey: 'customer_id'});
FuelType.hasMany(Automobile, {sourceKey: 'fuel_id', foreignKey: 'fuel_id'});
Customer.hasMany(Automobile, {sourceKey: 'customer_id', foreignKey: 'customer_id'});

Reservation.belongsTo(Automobile, {foreignKey: 'auto_id'});
Reservation.belongsTo(ParkingSpot, {foreignKey: 'spot_id'});
Automobile.hasMany(Reservation, {sourceKey: 'auto_id', foreignKey: 'auto_id'});
ParkingSpot.hasMany(Reservation, {sourceKey: 'spot_id', foreignKey: 'spot_id'});

Transaction.belongsTo(Customer, {foreignKey: 'customer_id'});
Customer.hasMany(Transaction, {sourceKey: 'customer_id', foreignKey: 'customer_id'});

OccupiedPublicSpot.belongsTo(ParkingSpot, {foreignKey: 'spot_id'});
OccupiedPublicSpot.belongsTo(Customer, {foreignKey: 'customer_id'});
ParkingSpot.hasMany(OccupiedPublicSpot, {sourceKey: 'spot_id', foreignKey: 'spot_id'});
Customer.hasMany(OccupiedPublicSpot, {sourceKey: 'customer_id', foreignKey: 'customer_id'});

OccupiedPersonalSpot.belongsTo(PersonalParkingSpot, {foreignKey: 'spot_id'});
OccupiedPersonalSpot.belongsTo(Customer, {foreignKey: 'customer_id'});
PersonalParkingSpot.hasMany(OccupiedPersonalSpot, {sourceKey: 'spot_id', foreignKey: 'spot_id'});
Customer.hasMany(OccupiedPersonalSpot, {sourceKey: 'customer_id', foreignKey: 'customer_id'});

module.exports.Connection = sequelize;
module.exports.Parking = Parking;
module.exports.ParkingSpot = ParkingSpot;
module.exports.PersonalParkingSpot = PersonalParkingSpot;
module.exports.Customer = Customer;
module.exports.Automobile = Automobile;
module.exports.FuelType = FuelType;
module.exports.Reservation = Reservation;
module.exports.Transaction = Transaction;
module.exports.OccupiedPersonalSpot = OccupiedPersonalSpot;
module.exports.OccupiedPublicSpot = OccupiedPublicSpot;