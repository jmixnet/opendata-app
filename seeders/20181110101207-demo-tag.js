'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tags', 
      [
      {
        tag: 'tag1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: 'tag2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: 'tag3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: 'tag4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tag: 'tag5',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tags', null, {});
  }
};
