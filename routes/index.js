var express = require('express');
var router = express.Router();

var dragons = require('../dragon');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dragons', function(req, res, next) {
  res.send(dragons);
})

module.exports = router;
