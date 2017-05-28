
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
//   $('#submit-btn').click(function(e) {
//     event.preventDefault(e);
//     var item = $('#form-textarea').val()
//     console.log(item)
//     waitingMsg()


// })


   function checkApis(){
   }
   //end of checkapis function


  //   //searches wolfram and appends result to a list
    // isMovieOrBook(item, (result) => {
    // const buttons =
    // `<div class="update-and-delete-btns" style= "">
    //     <a class="flash-update-btn" href="#">Update</a>
    //     <a class="flash-delete-btn" href="#">Delete</a>
    //  </div>`

    // test = result;
    // console.log(test);
    // if (result === 'both'){
    //   result = "other"
    //   $('.alerts').text(item + ": could be a Book or a Movie. Please specify by selecting an option below.")
    //   selectCategoryBtns();
    // } else if (result === 'movie' || result === 'book'){
    //     //$("<li>").text(item).appendTo($("." + result));//need an else if for book
    //     $("<li>").text(item).attr('data-title', item).appendTo($("." + result));
    //     $("li[data-title=\""+item+"\"]").append($(buttons).addClass('update-and-delete-btns').append($('<a>')));
    //     $('.alerts').text(item + ": Has been added to your " + result + " List")
    // } else {
    //   // $('.alerts').text(item + ": does not match your current categories. Would you like to add this to your Other List?")
    //   // productCheck(item, cb)
    //   yelpSearch(item, cb)

    // }
    // })

//   $.ajax({
//       method: "POST",
//       url: "/todo/create",
//       data: {'item': item}
//     }).done((object) => {
//       console.log("this is the route", object)
//       $("<li>").text(`${object.category}, ${object.item}`).appendTo($("." + result));
//       })
//     });
})




//ajax for yelp








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











    // test = result;
    // console.log(test);
    // if (result === 'both'){
    //   result = "other"
    //   $('.alerts').text(item + ": could be a Book or a Movie. Please specify by selecting an option below.")
    //   selectCategoryBtns();
    // } else if (result === 'movie' || result === 'book'){
    //     //$("<li>").text(item).appendTo($("." + result));//need an else if for book
    //     $("<li>").text(item).attr('data-title', item).appendTo($("." + result));
    //     $("li[data-title=\""+item+"\"]").append($(buttons).addClass('update-and-delete-btns').append($('<a>')));
    //     $('.alerts').text(item + ": Has been added to your " + result + " List")
    // } else {
      // $('.alerts').text(item + ": does not match your current categories. Would you like to add this to your Other List?")
      // productCheck(item, cb)
      // yelpSearch(item, cb)



//ajax for yelp
// $.ajax({
//     method: "POST",
//     url: "/todo/create",
//     data: "item"
//   }).done((object) => {
//     console.log("this is the route", object)
//     $("<li>").text(`${object.category}, ${object.item}`).appendTo($("#buy-list"));
//     // }
//   });


































//function takes an item and returns the category of the item to the supplied callback function






















































































































































// $(() => {
//   $.ajax({
//     url: "https://api.yelp.com/v3/businesses/search?term=mcdonalds&location=toronto",
//     method: "GET",
//     headers: {'Access-Control-Allow-Origin': 'http://localhost',
//       'authorization': '-fg8Z9CSNu2n4kNXeEOi3_L9kgUc93RXikn1l1th0Y2zp3QBDGbBUiWtvFC0ojfhRSk0K8hKrAVxC-qLgd9pO73scF0VLt_mGlmaoBHWH8UGw1UjSNyDieehz08oWXYx',
//       'User-Agent': 'curl/7.51.0'}
//   //   // dataType: 'jsonp',
//   //   beforeSend: function(xhr){xhr.setRequestHeader('authorization', 'Bearer -fg8Z9CSNu2n4kNXeEOi3_L9kgUc93RXikn1l1th0Y2zp3QBDGbBUiWtvFC0ojfhRSk0K8hKrAVxC-qLgd9pO73scF0VLt_mGlmaoBHWH8UGw1UjSNyDieehz08oWXYx');}
//   // Access-Control-Allow-Origin
//   }).done((data) => {
//     console.log(data);
//   });
// });

//when click on register than do

$(() => {

 loadLists();

 $('#submit-btn').click(function(e) {
    event.preventDefault();
    var item = $('#form-textarea').val()
    waitingMsg()
    $.ajax({
      method: "POST",
      url: "/todo/create",
      data: {'item': item}
    }).done((category) => {
      renderElement(item, category);
    })
  });


// on the click of the delete remove that specific list item
  $("li").on("click", ".flash-delete-btn", function(event) {
    event.preventDefault();
    let item = $(this).closest('li').data("title");//lie data attribute contains the items name
    let category = $(this).closest('ul').attr("class").split(' '); //this is an array of classes
    category = category[category.length-1]; //the last item of the array is the category
   $(this).closest('li').remove();//remove item on front end
    console.log(item,category);
    deleteItem(item, category) //remove item on back end
  });

  //on register click, register user
  $("#register-submit-btn").on("click", function(event) {
    event.preventDefault();
    let formData = $('#register-form').serializeArray();
    let name = formData[0].value;
    let email = formData[1].value;
    let password = formData[2].value;
    registerUser(name, email, password);
  });

  $("#login-submit-btn").on("click", function(event) {
    event.preventDefault()
    let formData = $('#login-form').serializeArray();
    let email = formData[0].value;
    let password = formData[1].value;
    loginUser(email, password);
  });

  $("#logout").on("click", function(event) {
    logoutUser();
  });
})


function deleteItem(item, category) {
  $.ajax({
    url: `/todo/${category}/${item}`,
    type: "DELETE"
  })
};

function loadLists() {
  let categories = ['movie', 'restaurant', 'book', 'product'];
  categories.forEach(function (category) {
    loadItems(category);
  })
}



function loadItems(category) { //4 categories
  $.ajax({
    url: `todo/${category}`,
    method: "GET",
    success: function(result) {
      result.forEach(function (item) { //loops through all items and renders
        console.log(item)
        renderElement(item.name, category)//renders items for specified category
      })
    }
  })
};

function renderElement(item, category) {
  const buttons =
  `<div class="update-and-delete-btns" style= "">
      <a class="flash-update-btn" href="#">Update</a>
      <a class="flash-delete-btn" href="#">Delete</a>
   </div>`
  //target parent ul line 431 and data title on parent line 432
  $("<li>").text(item).attr('data-title', item).appendTo($("." + category));
  $("li[data-title=\""+item+"\"]").append($(buttons).addClass('update-and-delete-btns'));
  $("<div>").after()
};

function logoutUser() {
  $.ajax({
    url: "/todo/logout",
    method: "POST",
    success: function() {
      location.reload();
      //render the ejs where someone has to log in or register
    }
  })
};

function loginUser(email, password) {
  $.ajax({
    url: "/todo/login",
    method: "POST",
    data: {'email': email, 'password': password},
    success: function(result) {
      location.reload();
      return result;
      //render the ejs where someone has signed in
    }
  })
};

function registerUser(name, email, password) {
  $.ajax({
    url: "/todo/register",
    method: "POST",
    data: {'username': name, 'email': email, 'password': password},
    success: function() {
      location.reload();
      //render the ejs where someone has signed in
    }
  })
};

function updateItem(item, category, newItem) {
  $.ajax({
    url: `/todo/${category}/${item}`,
    method: "PUT",
    data: {'item': newItem},
    success: function() {
      //update .val of item element
    }
  })
};

function updateUser(newName, newEmail, newPassword) {
  $.ajax({
    url: `/todo/profile`,
    method: "PUT",
    data: {'name': newName, 'newEmail': newEmail, 'password': newPassword}
    // success: function() {
    //   //update .val of item element
    // }
  })
};
