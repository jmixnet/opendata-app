var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json( { message: 'Welcome to API routing.' } );
});

module.exports = router;
