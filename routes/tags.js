var express = require('express');
var models = require("../models");

var router = express.Router();

router.get('/', function(req, res, next) {
    models.Tag.findAll({attributes: ['id', 'tag']
    })
    .then(tags  => {
       res.json(tags);
    });
    
});

module.exports = router;
