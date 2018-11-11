var express = require('express');
var models = require("../models");

var fs = require('fs');
var path = require('path');

var router = express.Router();

router.get('/:content_id', function(req, res, next) {

	var imagePath = path.join(__dirname, '../public/images/' + req.params.content_id);

	try {
		fs.statSync(imagePath);
	} catch(err) {
		return res.status(404).send({
			success: false,
			message: err
		});;
	}

	var buf = fs.readFileSync(imagePath);
	return res.send(buf, { 'Content-Type': 'image/jpeg' }, 200);

});

module.exports = router;
