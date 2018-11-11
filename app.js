var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var logger = require('morgan');

var models = require("./models");

var indexRouter = require('./routes/index');
var tagsRouter = require('./routes/tags');
var positionsRouter = require('./routes/positions');
var articlesRouter = require('./routes/articles');
var contentsRouter = require('./routes/contents');

var apiRouter = require('./routes/api/index');
var apiArticleRouter = require('./routes/api/articles');

var app = express();

app.set('superSecret',process.env.SECRET || 'opendataapp');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.urlencoded( { extended: false } ) );
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/tags', tagsRouter);
app.use('/positions', positionsRouter);
app.use('/articles', articlesRouter);
app.use('/contents', contentsRouter);

var apiRoutes = express.Router();

apiRoutes.post( '/authenticate', function( req, res ){

	models.User.findOne(
		{ where: {name: req.body.name, password: req.body.password} }
	)
	.then(user => {
		if (user) {
			var token= jwt.sign( user.toJSON(), app.get('superSecret'), {
				expiresIn: '24h'
			});
			return res.json({
				success: true,
				message: 'Authentication successfully finished.',
				token: token
			});
		} else {
			return res.send({
				success: false,
				message: 'Authentication failed.'
			});
		}
	});
});

apiRoutes.use( function( req, res, next ){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
		if (err) {
			return res.json({
				success: false,
				message: 'Invalid token'
			});
		}
		req.decoded = decoded;
		next();
	});
});

apiRoutes.use('/', apiRouter);
apiRoutes.use('/articles', apiArticleRouter);

app.use( '/api', apiRoutes );

module.exports = app;
