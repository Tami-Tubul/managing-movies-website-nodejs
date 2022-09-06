var express = require('express');
var router = express.Router();
let moviesBL = require("../models/moviesBL");



router.get('/:id', async function (req, res, next) {

  req.session.transactions += 1;
  
  if (req.session.transactions > req.session.maxTransactions)
      res.render('login', {loginError : "No more transactions for today..."});

 
  else {
    let id = req.params.id;
    let movieData = await moviesBL.getMovieById(id)
    res.render('movieData', { movie: movieData });
  }

});

module.exports = router;