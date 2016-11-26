var express = require('express');
var router = express.Router();
var fs = require('fs');

var lines = fs.readFileSync('./converted.txt').toString().split('\n');

router.get('/', function(req, res) {
  res.render('index');
});


router.post('/', function(req, res) {
  if (req.body.clonepaste != null) {
    var clonepaste = req.body.clonepaste;
    res.render('index', {
      clonepaste: clonepaste
    });
    return;
  }
  createPasteID(req, res);
  
});

function randWord() {
  return lines[Math.floor(Math.random() * lines.length)];
}

function createPasteID(req, res) {
    var lines = returnThreeLines();
    var pasteid = randWord() + randWord() + randWord();
    pasteid = pasteid.replace(/(\r\n|\n|\r)/gm, "");
    var collection = global.mongo.collection('pastes');
    collection.findOne({pasteid: pasteid}, function(err, doc) {
      if (doc == null) {
        insertPaste(pasteid, req, res);
        return;
      } else {
        createPasteID(req, res);
      }
    });
}

function insertPaste(pasteid, req, res) {
  var paste = req.body.paste;
  var timestamp = Math.round(+new Date() / 1000);
  var ip = req.ip;
  var syntax = req.body.syntax;
  
  var collection = global.mongo.collection('pastes');
  collection.insert({
    pasteid: pasteid,
    ip: ip,
    time: timestamp,
    syntax: syntax,
    paste: paste
  });
  
  res.redirect('/' + pasteid);
}

module.exports = router;