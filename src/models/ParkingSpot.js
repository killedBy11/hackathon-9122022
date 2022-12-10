const { DataTypes } = require('sequelize');

const ParkingSpot = sequelize => sequelize.define('ParkingSpot', {
    spot_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    spot_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    reservation_price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    park_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reservable: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = ParkingSpot;