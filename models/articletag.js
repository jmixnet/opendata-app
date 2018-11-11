'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define('ArticleTag', {
    article_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {});
  ArticleTag.associate = function(models) {
    // associations can be defined here
  };
  return ArticleTag;
};