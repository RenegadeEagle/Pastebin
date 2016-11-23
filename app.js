var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

MongoClient.connect('mongodb://localhost:27017/pastebin', function(err, db) {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  
  global.mongo = db;
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/view'))

app.use(function(req, res) {
  res.sendStatus(404);
});

app.use(function(err, req, res, next) {
  console.log("Error Logged\n" + err);
});


module.exports = app;
