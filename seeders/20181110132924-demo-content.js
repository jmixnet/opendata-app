'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Contents', 
      [
      {
        article_id: 1,
        content: '1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        article_id: 1,
        content: '2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Contents', null, {});
  }
};
