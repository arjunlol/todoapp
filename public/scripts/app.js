
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
    var formData = $('#search-form').serialize();
    console.log(formData)
    //needs to pass this value to wolf
    //when done clear form data

    //this ajax is to be moved into your ismovieorbook function
    // $.ajax({
    //   url: '/create',
    //   method: 'POST',
    //   data: formData //this will take an object of a category and an item
    //   }).done(() => {
    // })
  })
})


//this function as per name collapses the uls and lis
function collapseList(parent) {
  $(parent).slideUp().addClass('collapsed').find('ul').slideUp().addClass('collapsed');
}
//expands the lists
function expandList(parent) {
  $(parent).slideDown().removeClass('collapsed');
}




