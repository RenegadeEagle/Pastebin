var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/about', function(req, res) {
  res.render('about');
});

module.exports = router;