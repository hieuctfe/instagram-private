'use strict';
module.exports = (sequelize, DataTypes) => {
  const packages = sequelize.define('Packages', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    underscored: true,
  });
  packages.associate = function(models) {
    // associations can be defined here
    models.Packages.hasMany(models.Transaction)

  };
  return packages;
};
