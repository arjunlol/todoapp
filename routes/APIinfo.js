
var request = require('request-promise');

module.exports = (knex) => {

  //route handler for user creating an item
  router.get("/movieInfo", (req, res) => {
    let item = req.body.item;
    request({
      uri: 'https://api.themoviedb.org/3/search/movie',
      qs: {
        query: item,
        api_key: 'e191e18d0a5c6e9519a156c004f02527'}
    }).then((data) => {
  });

  return router;
}
