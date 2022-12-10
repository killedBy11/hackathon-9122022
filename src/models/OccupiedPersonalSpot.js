const {DataTypes} = require('sequelize');

const OccupiedPersonalSpot = sequelize => sequelize.define('OccupiedPersonalSpot', {
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
     begin:{
        type: DataTypes.DATE,
        allowNull: false
     },
    end: {
        type: DataTypes.DATE
    }
});

module.exports = OccupiedPersonalSpot;