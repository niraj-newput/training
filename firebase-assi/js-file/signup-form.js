$(function() {
  var vd = new Validation();
  $('#signout-btn').click(function() {
    var currentUser = firebase.auth().currentUser;
    console.log('logout ' + currentUser.email);
    if(currentUser){
      firebase.auth().signOut();
      window.location = 'index.html'; 
    }
  });
  
  $('#signup-submit').click(function(){
    vd.signUpValidation();
  });
     
  $.validator.addMethod("confirmPass", function (value, element){
    var flag = false;
    var password = $('#pass_c').val();
    console.log(value + ' ' + password);
    if(value === password ) {
      flag = true;
    }
    //console.log('password' + password + 'flag' + flag);
    return flag;
  }, "please re-enter same password");   
});    

// firebase auth listner
firebase.auth().onAuthStateChanged(function(user) {
  var us = firebase.auth().currentUser;
  if (user != null) {
    window.location.replace("user-information.html")
  } else {
    console.log('else' );
  }
});  


    
