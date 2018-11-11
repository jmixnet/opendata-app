var express = require('express');
var models = require("../models");

var router = express.Router();

router.get('/', function(req, res, next) {
    models.Position.findAll({attributes: ['id', 'lat', 'lng']})
    .then(positions  => {
       res.send(positions);
    });
});

router.get('/:id', function(req, res, next) {
    models.Position.findById(req.params.id, {include: [{model: models.Article , include: [{model: models.Content},{model: models.ArticleTag, attributes: ['id'] }] }] })
    .then(position => {
       res.send(position);
    });
});

module.exports = router;
