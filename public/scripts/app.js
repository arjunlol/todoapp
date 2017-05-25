$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<li>").text(user.user_name).appendTo($("#watch-list"));
    }
  });;
});



$(document).ready(function(){
  $('#view-lists').click(function(){
    $('.category-list').slideToggle();
  })

  $('#to-watch-list-btn').click(function(){
    $('#watch-list').slideToggle();
  })


})



//router post /create
// ajax

//will take router post req.body.item and category
//will dynamically create list item for each
// object
//  {

// }



