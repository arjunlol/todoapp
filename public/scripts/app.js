
//this ajax call takes each user in the db and adds that value to a new li inside the ul watch list
//this needs to be adapted to sort which actegory value given into whichever list
$(() => {
  $.ajax({
    method: "GET",
    url: "/todo"
  }).done((users) => {
    for(id of users) {
      $("<li>").text(id.user_name).appendTo($("#watch-list"));
    }
  });
});

//after doc is ready
//line 20-26 ish are collapsing the 4 category lists when the parent list button is collapsed
$(document).ready(function(){
  $('.listHeader').click(function(){
    if ($($(this)[0].nextElementSibling).is('.collapsed')) {
      expandList($(this)[0].nextElementSibling);
    } else {
      collapseList($(this)[0].nextElementSibling);
    }
  })

//this is todays work to submited value in the form (front end in browser)
//and trying to pass
  $('#submit-btn').click(function(e) {
    event.preventDefault(e);
    var item = $('#form-textarea').val()
    console.log(item)
    waitingMsg()


   function checkApis(){

















   }
   //end of checkapis function













    //searches wolfram and appends result to a list
    isMovieOrBook(item, (result) => {
    const buttons =
    `<div class="update-and-delete-btns" style= "">
        <a class="flash-update-btn" href="#">Update</a>
        <a class="flash-delete-btn" href="#">Delete</a>
     </div>`

    test = result;
    console.log(test);
    if (result === 'both'){
      result = "other"
      $('.alerts').text(item + ": could be a Book or a Movie. Please specify by selecting an option below.")
      selectCategoryBtns();
    } else if (result === 'movie' || result === 'book'){
        //$("<li>").text(item).appendTo($("." + result));//need an else if for book
        $("<li>").text(item).attr('data-title', item).appendTo($("." + result));
        $("li[data-title=\""+item+"\"]").append($(buttons).addClass('update-and-delete-btns').append($('<a>')));
        $('.alerts').text(item + ": Has been added to your " + result + " List")
    } else {
      // $('.alerts').text(item + ": does not match your current categories. Would you like to add this to your Other List?")
      // productCheck(item, cb)
      yelpSearch(item, cb)

    }
  })
  })




//ajax for yelp
$.ajax({
    method: "POST",
    url: "/todo/create",
    data: "item"
  }).done((object) => {
    console.log("this is the route", object)
    $("<li>").text(`${object.category}, ${object.item}`).appendTo($("#eat-list"));
    // }
  });





})
//doc ready close


function selectCategoryBtns(){
  $('.flash-category-btn').show();

}


//msg user recives while waiting for the apis response
function waitingMsg(){
  $('.alerts').text("Categorizing now..")
}

//this function as per name collapses the uls and lis
function collapseList(parent) {
  $(parent).slideUp().addClass('collapsed').find('ul').slideUp().addClass('collapsed');
}
//expands the lists
function expandList(parent) {
  $(parent).slideDown().removeClass('collapsed');
}





















































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
