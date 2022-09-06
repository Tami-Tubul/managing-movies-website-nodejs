var express = require('express');
var router = express.Router();
let usersBL = require("../models/usersBL")
let dateFile = require("../reusableCode/calculateDate")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {loginError: ""});
});


router.post("/", async function (req, res, next) {
  let uname = req.body.username;
  let pass = req.body.password;
  let userLogin = await usersBL.findUserLogin(uname, pass)

  if (userLogin && userLogin != "admin") { //if user is exist and not admin

    if (!req.session.transactions || (req.session.transactions && (req.session.userConnected != userLogin.userName))) { 
      req.session.transactions = 0;
      req.session.maxTransactions = userLogin.numOfTransactions;
      req.session.userConnected = userLogin.userName;
      req.session.todayDate = dateFile.todayDate();
      res.redirect("/menu")
    }

    else {

      if (req.session.transactions > req.session.maxTransactions) {

        if (req.session.todayDate == dateFile.todayDate()) {

          res.render('login', {loginError : "No more transactions for today..."});


        }

        else {
          req.session.transactions = 0;
          res.redirect("/menu")
        }

      }

      else {

        if (req.session.todayDate != dateFile.todayDate())
          req.session.transactions = 0;
        res.redirect("/menu")
      }

    }

  }

  else if(!userLogin) {

    res.render('login', {loginError : "User doesn't exist!"});

  }

})

module.exports = router;
