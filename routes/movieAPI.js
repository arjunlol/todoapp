
const express = require('express');
const router  = express.Router();
const request = require('request-promise');

module.exports = (knex) => {

  //route handler for getting information about a movie
  router.get("/movieInfo", (req, res) => {
    let item = req.body.item;
    let information = {};


    request({
      uri: 'https://api.themoviedb.org/3/search/movie',
      qs: {
        query: item,
        api_key: 'e191e18d0a5c6e9519a156c004f02527'}
      }).then((data) => {
        let result = JSON.parse(data);
        //image link is base + size + path
        information['imageLink'] = `https://image.tmdb.org/t/p/w500${result.results[0].poster_path}`
        information['overview'] = result.results[0].overview;
        information['rating'] = result.results[0].vote_average;
        res.json(information);
    });
  })
  return router;
}
