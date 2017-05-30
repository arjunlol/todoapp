
//abstracted from app.js to avoid conflicts while working
//could abstract app.js further later
$(document).ready(function () {

  //listener on reg button shows register form
  $("#register-btn").click(function (e) {
    event.preventDefault(e);
    $("#login-popup-section").hide();
    $("#register-popup-section").show();
  });

  //listener on login btn shows login form
  $("#login-btn").click(function (e){
    event.preventDefault(e);
    $("#register-popup-section").hide();
    $("#login-popup-section").show();
  });

  //listener on user img placeholder shows user info update form
  $("#user-img-update-btn").click(function (e){
    event.preventDefault(e);
    $("#update-user-info-section").toggleClass("hidden");
  });

  //listener on user update form submit button, and hides the form
  $("#update-submit-btn").click(function (e){
    $("#update-user-info-section").addClass("hidden");
  });

  //listener on list item edit icon, shows edit section on click
  $(".list").on("click", "a.flash-update-btn", function(e){
    event.preventDefault(e);
    $(this).closest("li").find("#dialog-edit").toggle();
  });

  //listener on list item info button, shows info section
  //currently works on things to watch section only
  $(".list").on("click", "a.flash-info-btn", function(e){
    event.preventDefault(e);
    $(this).closest("li").find(".info-section").toggle();
  });
})






