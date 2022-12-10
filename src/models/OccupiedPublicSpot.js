const {DataTypes} = require('sequelize');
const OccupiedPublicSpot = sequelize => sequelize.define('OccupiedPublicSpot', {
    occupation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    spot_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customer_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    begin_timestamp:{
        type: DataTypes.DATE,
        allowNull: false
    },
    end_timestamp: {
        type: DataTypes.DATE
    }
});

module.exports = OccupiedPublicSpot;