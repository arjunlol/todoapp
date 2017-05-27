
module.exports = function isMovieOrBook(item, cb) {

// function isMovieOrBook (item, cb) {
  let appid = '8A2RH8-QPYYEQGL7K'; //authorization token
  let isMovie = false;
  let isBook = false;
  let result;
  const $ = require('jQuery');

  $.ajax({
    method: "GET",
    //wolfram API URL
    url: `http://api.wolframalpha.com/v2/query?input=${item}&appid=${appid}&output=json`,
    dataType: 'jsonp',
    success: function (data){ //data is result from wolfram api
      //if wolfram deems no ambiguity in the search, then it doesnt return any assumptions but only 'datatype'
      let categories = data.queryresult.assumptions || data.queryresult.datatypes;
      console.log(categories)
      console.log(data)
      categories = categories.values || categories[0].values|| categories.split(',') //if using the 'assumptions' then use the .values of the assumptions, if not split datetypes
      categories.forEach(category => {
        //if returned assumptions are either a book or movie set accordingly
        //if using assumptions then the name of the assumptions exists otherwise only use the datatype
        if((category.name || category) === 'Book'){
          isBook = true;
        }
        if((category.name || category) === 'Movie'){
          isMovie = true;
        }
      });
    //after all assumption values are iterated over, set result to be both, movie, book. or neither
     if (isMovie && isBook) {
      result = 'both';
     } else if (isMovie) {
      result = 'movie';
     } else if (isBook) {
      result = 'book';
     } else {
      result = 'neither';
     }
     cb(result);
    }
  })
};
