'use strict';
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    article_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    mimetype: DataTypes.STRING
  }, {});
  Content.associate = function(models) {
    // associations can be defined here
  };
  return Content;
};