'use strict';
module.exports = (sequelize, DataTypes) => {
    const TransactionDetail = sequelize.define('TransactionDetail', {
        transactionId: DataTypes.INTEGER,
        isFollowing: DataTypes.BOOLEAN,
        postLiked: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});
    TransactionDetail.associate = function (models) {
        // associations can be defined here
        models.TransactionDetail.belongsTo(models.User)
        models.TransactionDetail.belongsTo(models.Transaction)
    };
    return TransactionDetail;
};
