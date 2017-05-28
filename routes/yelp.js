module.exports = (keyword, cb) => {

  const Yelp = require('node-yelp-api-v3');

  const yelp = new Yelp({
    consumer_key: 'U4-THtUf292a-B42xFF5ZQ',
    consumer_secret: 'kAGhao0yAWGrjdinTMmkZtTbL37P1FISxF9MaAOuuNTy6rU0e6YLo1qeUZT8rwEK'
  });

  //yelp.searchBusiness(params);
  yelp.searchBusiness({ term: keyword, location: 'Toronto', limit: 1, categories: "restaurants,cafes" })
  .then((results) => {
    // console.log('categories: ', results.businesses, keyword);
    var id = results.businesses[0].id;
    var keywordArr = keyword.toLowerCase().split(' ');
    var resultsArr = id.split('-');
    // console.log(keywordArr, resultsArr)
    var found = false;
    for (var i = 0; i < keywordArr.length; i++) {
      if (resultsArr.indexOf(keywordArr[i]) > -1) {
        found = true;
        break;
      }
    }
    // console.log('yelp.js results: ', results.businesses[0].categories[0].alias)
    // console.log('yelp.js results: ', results.businesses[0].id)

    cb(found)

    // cb(results)

  });
}

// console.log("here")
//  const Yelp = require('node-yelp-api-v3');

//   const yelp = new Yelp({
//     consumer_key: 'U4-THtUf292a-B42xFF5ZQ',
//     consumer_secret: 'kAGhao0yAWGrjdinTMmkZtTbL37P1FISxF9MaAOuuNTy6rU0e6YLo1qeUZT8rwEK'
//   });

//    let keyword = 'pizza pizza';
//   //yelp.searchBusiness(params);
//   yelp.searchBusiness({ term: keyword, location: 'Toronto', limit: 1, categories: "restaurants,cafes" })
//   .then((results) => console.log(results, results.businesses[0].categories));
//
