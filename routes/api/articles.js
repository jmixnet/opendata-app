var express = require('express');
var models = require("../../models");

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../uploads/'))
	}
})
var uploadDir = multer({ storage: storage })


var router = express.Router();

router.post('/', uploadDir.single('file_data'), function(req, res, next) {

	if (!req.body.lat) {
		return res.status(403).json({
			success: false,
			message: 'Parameter Required.'
		});
	}

	if (!req.body.lng) {
		return res.status(403).json({
			success: false,
			message: 'Parameter Required.'
		});
	}

	var originalname = req.file.originalname;
	var mimetype =  req.file.mimetype;

	models.Position.findOrCreate({where: {lat: req.body.lat, lng: req.body.lng}})
	.spread((position, created) => {

		models.Article.create({ position_id: position.id, user_id: req.decoded.id })
		.then((article) => {
			if (req.body.tag_id) {
				models.ArticleTag.create({ article_id: article.id, tag_id: req.body.tag_id });
			}
			models.Content.create({ article_id: article.id, content: originalname, mimetype: mimetype})
			.then((content) => {
				fs.rename(req.file.path, path.join(__dirname, '../../public/images/' + content.id), function (err) {
					if (err) {
						console.log(err);
					}
				});
				return res.json({
					success: true,
					message: 'Article Entry successfully finished.',
					position_id: position.id,
					article_id: article.id,
					content_id: content.id
				});
			});
		});

	});
});

router.post('/:article_id', uploadDir.single('file_data'), function(req, res, next) {

	if (!req.params.article_id) {
		return res.status(403).json({
			success: false,
			message: 'Parameter Required.'
		});
	}

	var originalname = req.file.originalname;
	var mimetype =  req.file.mimetype;

	models.Content.create({ article_id: req.params.article_id, content: originalname, mimetype: mimetype })
	.then((content) => {
		fs.rename(req.file.path, path.join(__dirname, '../../public/images/' + content.id), function (err) {
			if (err) {
				console.log(err);
			}
			return res.json({
				success: true,
				message: 'Article Content Add successfully finished.',
				content_id: content.id
			});
		});
	});
});

module.exports = router;
