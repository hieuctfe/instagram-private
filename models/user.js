'use strict';
// import bcrypt from 'bcryptjs'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        proxy: DataTypes.STRING,
        isDelete: DataTypes.BOOLEAN,
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        models.User.hasMany(models.TransactionDetail)
    };
    return User;
};
