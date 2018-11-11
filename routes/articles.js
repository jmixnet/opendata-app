var express = require('express');
var models = require("../models");

var router = express.Router();

router.get('/:id', function(req, res, next) {
    models.Article.findById(req.params.id, {include: [{model: models.Content},{model: models.ArticleTag, attributes: ['id'] }] })
    .then(article => {
       res.json(article);
    });
});

module.exports = router;
