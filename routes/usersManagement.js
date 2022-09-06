var express = require('express');
var router = express.Router();
const usersBL = require("../models/usersBL")

router.get('/', async function (req, res, next) {
  let allUsers = await usersBL.getAllUsers()
  res.render('usersManagement', { users: allUsers });
});

module.exports = router;
