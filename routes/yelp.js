module.exports = function (keyword, cb){

  const Yelp = require('node-yelp-api-v3');

  const yelp = new Yelp({
    consumer_key: 'U4-THtUf292a-B42xFF5ZQ',
    consumer_secret: 'kAGhao0yAWGrjdinTMmkZtTbL37P1FISxF9MaAOuuNTy6rU0e6YLo1qeUZT8rwEK'
  });

  //yelp.searchBusiness(params);
  yelp.searchBusiness({ term: keyword, location: 'Toronto', limit: 1, categories: "restaurants,cafes" })
  .then((results) =>{
    // console.log(results, results.businesses[0].categories));
    if(results) {
      cb(results);
    }


//returns true or false

})
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
