var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});


router.post('/', function(req, res) {
  if(req.body.clonepaste != null) {
    var clonepaste = req.body.clonepaste;
    console.log(paste);
    res.render('index', {clonepaste : clonepaste});
    return;
  }
  var paste = req.body.paste;
  var timestamp = Math.round(+new Date()/1000);
  var ip = req.ip;
  var syntax = req.body.syntax;
  
  var lines = returnThreeLines();
  var pasteid = lines.line1 + lines.line2 + lines.line3;
  pasteid = pasteid.replace(/(\r\n|\n|\r)/gm,"");
  
  var collection = global.mongo.collection('pastes');
  collection.insert({
    pasteid: pasteid, 
    ip : ip, 
    time : timestamp,
    syntax: syntax,
    paste : paste
  });
  
  res.redirect('/' + pasteid);
});


function returnThreeLines(){
  var data = fs.readFileSync('./converted.txt', 'utf-8');
  var lines = data.split('\n');
  return {
    line1: lines[Math.floor(Math.random()*lines.length)],
    line2: lines[Math.floor(Math.random()*lines.length)],
    line3: lines[Math.floor(Math.random()*lines.length)]
  }
}

module.exports = router;