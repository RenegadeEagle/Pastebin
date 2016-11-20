var express = require('express');
var router = express.Router();

router.get('/:pasteid', function(req, res) {
    var collection = global.mongo.collection('pastes');
    
    var pasteid = req.params.pasteid;
    //console.log("Attempting to find pasteid  " + pasteid);
    
    collection.findOne({pasteid:pasteid}, function (err, doc) {
        //console.log(doc);
        if(doc != null) {
            res.render("view", {
                exists : true,
                syntax: doc.syntax,
                paste: doc.paste
            });
        } else {
            res.render("view", {exists: false});
        }
    });
});

module.exports = router;
