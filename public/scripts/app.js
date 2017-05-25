$(() => {


  $.ajax({
    method: "GET",
    url: "/todo"
  }).done((users) => {
    for(user of users) {
      $("<li>").text(user.name).appendTo($("#watch-list"));
    }
  });;
});

$(document).ready(function(){
  $('.listHeader').click(function(){
    if ($($(this)[0].nextElementSibling).is('.collapsed')) {
      // expandList($(this)[0].nextElementSibling);
    } else {
      collapseList($(this)[0].nextElementSibling);
    }
  })
})

function collapseList(parent) {
  $(parent).slideUp().addClass('collapsed').find('ul').slideUp().addClass('collapsed');
}

function expandList(parent) {
  $(parent).slideDown().removeClass('collapsed');
}

//router post /create
// ajax

//will take router post req.body.item and category
//will dynamically create list item for each
// object
//  {

// }




















function isMovieOrBook (item, cb) {
  let appid = '8A2RH8-QPYYEQGL7K';
  let isMovie = false; //1
  let isBook = false; //2
  let result;
  let x = false;
 $.ajax({
    method: "GET",
    //wolfram API URL
    url: `http://api.wolframalpha.com/v2/query?input=${item}&appid=${appid}&output=json`,
    dataType: 'jsonp',
    success: function (data){ //data is result from wolfram api
      let categories = data.queryresult.assumptions.values;

      categories.forEach(category => {
        //if returned assumptions are either book or movie
        if(category.name === 'Book'){
          isBook = true;
        }
        if(category.name === 'Movie'){
          isMovie = true;
        }
      });
     if (isMovie && isBook) {
      result = 'Both';
     } else if (isMovie) {
      result = 'Movie';
     } else if (isBook) {
      result = 'Book';
     } else {
      result = 'Neither';
     }
     console.log(result);
     cb(result);
    }

  })
 // .then(() => {
 //      cb(result);
 //     })
};


$(document).ready(function(){
  let test;
  isMovieOrBook('galaxy', (result)=> {
    test = result;
    console.log(test);

  });
});
