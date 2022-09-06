var express = require('express');
var router = express.Router();
const usersBL = require("../models/usersBL")
const date = require('../reusableCode/calculateDate')

router.get('/addUser', function (req, res, next) {
  res.render('userData', { wrongUser: "", formType: "add" });
});


router.get('/updateUser/:uname', async function (req, res, next) {
  let userData = await usersBL.getUserByName(req.params.uname)
  res.render('userData', { wrongUser: "", formType: "update", user: userData });
});


router.get('/deleteUser/:uname', async function (req, res, next) {
  let uname = req.params.uname;
  let status = await usersBL.deleteUser(uname)
  if (status == "Deleted!") {
       res.redirect("/usersManagement")
  }

});

router.post('/addUser', async function (req, res, next) {

  let newUser = { userName: req.body.username, password: req.body.password, createdDate: date.todayDate(), numOfTransactions: req.body.transactions }
  let status = await usersBL.addUser(newUser)
  if (status == "Added!")
    res.redirect("/usersManagement")
  else {
    res.render('userData', { wrongUser: status });
  }
});


router.post('/updateUser/:uname', async function (req, res, next) {
  let unameBeforeUpdate = req.params.uname;
  let updatedUser = { userName: req.body.username, password: req.body.password, createdDate: date.todayDate(), numOfTransactions: req.body.transactions }
  let status = await usersBL.updateUser(unameBeforeUpdate,updatedUser)
  if (status == "Updated!")
    res.redirect("/usersManagement")
});

module.exports = router;
