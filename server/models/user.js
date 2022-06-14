const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../db');


const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User