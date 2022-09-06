var express = require('express');
var router = express.Router();
//let createMovieBL = require("../models/createMovieBL");
let moviesBL = require("../models/moviesBL");


router.get('/', function (req, res, next) {
  res.render('createMovie', {});
});


router.post('/saveMovie', async function (req, res, next) {
   
  let movieObj = {name: req.body.name , language: req.body.language , genres: Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres]}

  let status = await moviesBL.saveNewMovie(movieObj)

  if (status == "Created!") {

      req.session.transactions += 1;

      if (req.session.transactions > req.session.maxTransactions)
         res.render('login', {loginError : "No more transactions for today..."});


      else
        res.redirect("/menu")
  }

  else {
    res.redirect("/")
  }

});



module.exports = router;
