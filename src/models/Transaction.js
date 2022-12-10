const {DataTypes} = require('sequelize');
const Transaction = sequelize => sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    park_id:{
        type: DataTypes.INTEGER
    },
    receiving_customer_id: {
        type: DataTypes.INTEGER
    },
    value:{
        type: DataTypes.INTEGER
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    time:{
        type: DataTypes.DATE,
        allowNull: false
    }

});

module.exports = Transaction;

