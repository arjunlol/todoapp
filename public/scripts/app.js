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































//function takes an item and returns the category of the item to the supplied callback function
function isMovieOrBook (item, cb) {
  let appid = '8A2RH8-QPYYEQGL7K'; //authorization token
  let isMovie = false;
  let isBook = false;
  let result;
 $.ajax({
    method: "GET",
    //wolfram API URL
    url: `http://api.wolframalpha.com/v2/query?input=${item}&appid=${appid}&output=json`,
    dataType: 'jsonp',
    success: function (data){ //data is result from wolfram api
      console.log(data);
      let categories = data.queryresult.assumptions.values;

      categories.forEach(category => {
        //if returned assumptions are either a book or movie set accordingly
        if(category.name === 'Book'){
          isBook = true;
        }
        if(category.name === 'Movie'){
          isMovie = true;
        }
      });
    //after all assumption values are iterated over, set result to be both, movie, book. or neither
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
};

//testing ismovieorbook function
$(document).ready(function(){
  let test;
  isMovieOrBook('Guardians of the Galaxy', (result)=> {
    test = result;
    console.log(test);

  });
});
