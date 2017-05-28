

$(document).ready(function(){
  $('#register-btn').click(function(e) {
    event.preventDefault(e);
    $('#register-popup-section').show();
  })

 $('#login-btn').click(function(e){
    event.preventDefault(e);
    $('#login-popup-section').show();
 })
 $('#user-img-update-btn').click(function(e){
  event.preventDefault(e);
  $('#update-user-info-section').removeClass('hidden');
 })
 $('#update-submit-btn').click(function(e){
  $('#update-user-info-section').addClass('hidden');
 })

})




