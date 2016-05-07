// ----------------------
// ****** Modules! ******
// ----------------------
var express = require('express'),
    router = express.Router(),
    /*
      'path' is needed because relative paths ../../ are considered malicious
      when importing modules in node. Example: importing routes in index.js
    */
    path = require('path');



router.get('/', function(req, res, next) {
  res.render("index");
});



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;