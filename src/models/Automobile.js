const {DataTypes} = require('sequelize');

const Automobile = sequelize => sequelize.define('Automobile', {
    auto_id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    registration_plate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fuel_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pollution_standard:{
        type: DataTypes.INTEGER
    }
});

module.exports = Automobile;