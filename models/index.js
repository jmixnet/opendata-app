'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

{
  db['Article'].belongsTo(db['User'], {foreignKey: 'user_id'});
  db['Article'].belongsTo(db['Position'], {foreignKey: 'position_id'});
  db['Article'].hasMany(db['ArticleTag'], {foreignKey: 'article_id'});
  db['Article'].hasMany(db['Content'], {foreignKey: 'article_id'});

  db['ArticleTag'].belongsTo(db['Article'], {foreignKey: 'article_id'});
  db['ArticleTag'].belongsTo(db['Tag'], {foreignKey: 'tag_id'});

  db['Content'].belongsTo(db['Article'], {foreignKey: 'article_id'});

  db['Position'].hasMany(db['Article'], {foreignKey: 'position_id'});

  db['Tag'].hasMany(db['ArticleTag'], {foreignKey: 'tag_id'});

  db['User'].hasMany(db['Article'], {foreignKey: 'user_id'});
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
