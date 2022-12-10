const { DataTypes } = require('sequelize');

const FuelType = sequelize => sequelize.define('FuelType', {
    fuel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FuelType;