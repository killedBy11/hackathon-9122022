const {DataTypes} = require('sequelize');

const PersonalParkingSpot = sequelize => sequelize.define('PersonalParkingSpot', {
    spot_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
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
    latitude: {
        type: DataTypes.DOUBLE
    },
    longitude: {
        type: DataTypes.DOUBLE,
    },
    active_days: {
        type: DataTypes.INTEGER
    },
    begin_day0: {
        type: DataTypes.DATE
    },
    end_day0: {
        type: DataTypes.DATE
    },
    begin_day1: {
        type: DataTypes.DATE
    },
    end_day1: {
        type: DataTypes.DATE
    },
    begin_day2: {
        type: DataTypes.DATE
    },
    end_day2: {
        type: DataTypes.DATE
    },
    begin_day3: {
        type: DataTypes.DATE
    },
    end_day3: {
        type: DataTypes.DATE
    },
    begin_day4: {
        type: DataTypes.DATE
    },
    end_day4: {
        type: DataTypes.DATE
    },
    begin_day5: {
        type: DataTypes.DATE
    },
    end_day5: {
        type: DataTypes.DATE
    },
    begin_day6: {
        type: DataTypes.DATE
    },
    end_day6: {
        type: DataTypes.DATE
    }
});

module.exports = PersonalParkingSpot;