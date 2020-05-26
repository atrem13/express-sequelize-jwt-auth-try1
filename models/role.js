'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING
  }, {
    tableName:'roles'
  });
  role.associate = function(models) {
    // associations can be defined here
    role.belongsToMany(models.user,{
      through:'user_models',
      foreignKey:'role_id',
      otherKey:'user_id'
    });
  };
  return role;
};