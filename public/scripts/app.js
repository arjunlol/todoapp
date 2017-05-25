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
  $('.listHeader').click(function(){
    if ($($(this)[0].nextElementSibling).is('.collapsed')) {
      expandList($(this)[0].nextElementSibling);
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



