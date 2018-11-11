'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ArticleTags', 
      [
      {
        article_id: 1,
        tag_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        article_id: 1,
        tag_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ArticleTags', null, {});
  }
};
