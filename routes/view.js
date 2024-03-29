var express = require('express');
var router = express.Router();

router.get('/:pasteid', function(req, res) {
    var collection = global.mongo.collection('pastes');
    var pasteid = req.params.pasteid;
    
    console.log("Attempt paste access of " + pasteid + " from " + req.ip);
    
    collection.findOne({pasteid:pasteid}, function (err, doc) {
        if(doc != null) {
            res.render("view", {
                exists : true,
                syntax: doc.syntax,
                paste: doc.paste,
                pasteid: pasteid
            });
        } else {
            res.render("view", {exists: false});
        }
    });
});
router.get('/:pasteid/raw', function(req, res) {
    res.type('text/plain');
    var collection = global.mongo.collection('pastes');
    var pasteid = req.params.pasteid;
    collection.findOne({pasteid:pasteid}, function (err, doc) {
        if(doc != null) {
            res.send(doc.paste + '\n');
        } else {
            res.render("view", {exists: false});
        }
    });
});

module.exports = router;