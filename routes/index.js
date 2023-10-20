var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let name = ''


  res.render('index', {
    title: 'Samuel Jose Perez Belisario Ci. 30.459.887 Seccion 4',
    name: name,
  });
});

module.exports = router;