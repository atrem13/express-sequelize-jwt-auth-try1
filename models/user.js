'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName:'users'
  });
  user.associate = function(models) {
    // associations can be defined here
    user.belongsToMany(models.role,{
      through:'user_roles',
      foreignKey:'user_id',
      otherKey:'role_id'
    });
  };
  return user;
};