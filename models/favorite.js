'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {foreignKey: 'UserId', as: 'user'})
  };
  return Favorite;
};
