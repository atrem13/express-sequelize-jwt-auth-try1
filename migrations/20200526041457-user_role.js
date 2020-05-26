'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('user_roles', {
    user_id:Sequelize.INTEGER,
    role_id:Sequelize.INTEGER,
    CreatedAt:{
      allowNull:false,
      type:Sequelize.DATE
    },
    UpdatedAt:{
      allowNull:false,
      type:Sequelize.DATE
    }
   });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.dropTable('user_roles');
  }
};
