$(function() {
var vd = new Validation();
  $('#signup-link').click(function() {
    window.location = 'signup-form.html';
  });
  $('#signin-submit').click(function(){
    vd.signInValidation();
  });
  
});

firebase.auth().onAuthStateChanged(function(user) {
  console.log(user);
  if (user != null) {
    var providerId = firebase.auth().fetchProvidersForEmail(user.email);
    console.log('if' + user.email + ' UID ' + user.uid);
    window.location.href = 'user-information.html';
  } else {
    var app = firebase.app();
  }
});  


    
