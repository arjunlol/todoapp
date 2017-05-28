module.exports = function (item, cb) {

  var request = require('request-promise');
  let result = {'movie':false, 'book':false};

  request({
    uri: 'http://api.wolframalpha.com/v2/query',
    qs: {
      input: item,
      appid: '8A2RH8-QPYYEQGL7K',
      output: 'json'}
  }).then((data) => {
    let wolframResult = JSON.parse(data);
    let categories = wolframResult.queryresult.assumptions || wolframResult.queryresult.datatypes;
    if(!(categories === "")) {
      categories = categories.values || categories[0].values|| categories.split(',') //if using the 'assumptions' then use the .values of the assumptions, if not split datetypes
      categories.forEach(category => {
  //         //if returned assumptions are either a book or movie set accordingly
        //if using assumptions then the name of the assumptions exists otherwise only use the datatype
        if((category.name || category) === 'Book'){
          result.book = true;
        }
        if((category.name || category) === 'Movie'){
          result.movie = true;
        }
      });
    }
  //after all assumption values are iterated over, set result to be both, movie, book. or neither
   cb(result);

    // res.json((parser.toJson(data)));
    // res.send(wolframResult.queryresult.assumptions.values);
  });
};
// return any assumptions but only 'datatype'
//       cb(data);
//       let categories = data.queryresult.assumptions || data.queryresult.datatypes;
//       console.log(categories)
//       console.log(data)
//       categories = categories.values || categories[0].values|| categories.split(',') //if using the 'assumptions' then use the .values of the assumptions, if not split datetypes
//       categories.forEach(category => {
// //         //if returned assumptions are either a book or movie set accordingly
//         //if using assumptions then the name of the assumptions exists otherwise only use the datatype
//         if((category.name || category) === 'Book'){
//           isBook = true;
//         }
//         if((category.name || category) === 'Movie'){
//           isMovie = true;
//         }
//       });
//     //after all assumption values are iterated over, set result to be both, movie, book. or neither
//      if (isMovie && isBook) {
//       result = 'both';
//      } else if (isMovie) {
//       result = 'movie';
//      } else if (isBook) {
//       result = 'book';
//      } else {
//       result = 'neither';
//      }
//      cb(result);
//     }
//   })
// };


