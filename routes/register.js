var express = require('express');
var models = require("../models");

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register', {
    title: 'ユーザ登録'
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.username;
  // var email = req.body.email;
  var password = req.body.password;
  if (!name || !password) {
    res.render('register', {
      title: 'ユーザ登録',
      message: 'ユーザ名、パスワードは必須入力です'
    });
  } else {
    models.User.findOne({ where: {name: name} })
    .then(user => {
      if (user) {
        res.render('register', {
          title: 'ユーザ登録',
          message: 'ユーザ名('+ name +')は既に登録されています'
        });
      } else {
        models.User.create({ name: name, password: password })
        .then((content) => {
          res.redirect('/');
        });
      }
    });
  }
});

module.exports = router;
