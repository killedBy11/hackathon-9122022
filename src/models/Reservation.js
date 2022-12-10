const { DataTypes } = require('sequelize');

const Reservation = sequelize => sequelize.define('Reservation', {
    reservation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    begin_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    auto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    spot_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Reservation;