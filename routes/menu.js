var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('menu', { username: req.session.userConnected });
});



module.exports = router;
