'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    customerUserName: DataTypes.STRING,
    packageId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    note: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
      models.Transaction.hasMany(models.TransactionDetail)
      models.Transaction.belongsTo(models.Packages)
  };
  return Transaction;
};
