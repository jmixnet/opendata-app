'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL
  }, {});
  Position.associate = function(models) {
    // associations can be defined here
  };
  return Position;
};