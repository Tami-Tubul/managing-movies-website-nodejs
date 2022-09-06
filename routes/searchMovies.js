var express = require('express');
var router = express.Router();
let moviesBL = require("../models/moviesBL");


router.get('/', function (req, res, next) {
  res.render('searchMovies', {});
});


router.post('/searchResults', async function (req, res, next) {

  req.session.transactions += 1;

  if (req.session.transactions > req.session.maxTransactions) {
       res.render('login', {loginError : "No more transactions for today..."});

  }


  else {
    let resultsMoviesArr = await moviesBL.searchMovies(req.body)
    res.render('searchResults', { resultsMovies: resultsMoviesArr })

  }


});





module.exports = router;
