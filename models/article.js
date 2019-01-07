'use strict';

var User = require("./user");
var ArticleTag = require("./articletag");

module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    position_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};