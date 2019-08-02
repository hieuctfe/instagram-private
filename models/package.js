'use strict';
module.exports = (sequelize, DataTypes) => {
  const package = sequelize.define('package', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    underscored: true,
  });
  package.associate = function(models) {
    // associations can be defined here
    models.Package.hasMany(models.Transaction)
    
  };
  return package;
};