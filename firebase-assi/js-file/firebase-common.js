
  // Initialize Firebase
var config = {
apiKey: "AIzaSyAQh5kRgi79JisqqNyJZCZTL584oAQPAmw",
authDomain: "authentication-3b271.firebaseapp.com",
databaseURL: "https://authentication-3b271.firebaseio.com",
projectId: "authentication-3b271",
storageBucket: "authentication-3b271.appspot.com",
messagingSenderId: "65252869653"
};
firebase.initializeApp(config);


function Validation () {
    
  this.getSignInEmailPassword = function (){
    var email = $('#signin-email').val();
    var password = $('#signin-password').val();
    signin(email, password);
  }
    
  function signin (email, password){
    console.log('sign in method');
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        $('#signin-result').addClass('show').removeClass('hidden');
        $('#signin-result label').text('Please enter valid password');
      } else if(errorCode === "auth/user-not-found"){
        $('#signin-result').addClass('show').removeClass('hidden');
        $('#signin-result label').text(errorMessage);
      } else {
        $('#signin-result label').val(errorMessage);
      }
      console.log(error);
    });
  }
  
  this.getSignUpEmailPassword = function(){
    var email = $('#email').val();
    var password = $('#password').val();
    signup(email,password);
  }
    
  function signup (email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        console.log('The password is too weak.');
      } else {
        $('#signup-result').addClass('show').removeClass('hidden');
        $('#signup-result label').text(errorMessage);
        console.log(errorMessage);
      }
      signUpFlag = false;
      console.log(errorMessage);
    });
  }
};

function SignInEventHandler () {
  this.signInEvent = function () {
    signInEventAttach();
  }
  
  function signInEventAttach(){
    var vd = new Validation();
    $('#signup-link').click(function() {
      window.location = 'signup-form.html';
    });
    
    $("form[name='signIn']").validate( {
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
        }
      },
      messages: {
        password: {
          required: 'Please provide a password',
        },
        email:{ 
          required: 'Please enter a email address',
        }
      },
      submitHandler: function(form) {
        vd.getSignInEmailPassword();
      }
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
  }
}

function SignUpEventHandler () {
  this.signUpEvent = function (){
    signUpEventAttach();
  }
  
  function signUpEventAttach (){
    var vd = new Validation();
    $('#signout-btn').click(function() {
      var currentUser = firebase.auth().currentUser;
      console.log('logout ' + currentUser.email);
      if(currentUser){
        firebase.auth().signOut();
        window.location = 'index.html'; 
      }
    });
    
    $("form[name='signUp']").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
        },
        pass: {
          equalTo: '#password',
        }
      },
      messages: {
        email: { 
          required: "Please enter a email address",
        },
        password: {
          required: "Please enter the password",
          minlength: "Your password must be at least 8 characters long",
        },
        pass : 'enter the same password',
      },
      submitHandler: function(form) {
        console.log('validation success');
        vd.getSignUpEmailPassword();
      }
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
      var us = firebase.auth().currentUser;
      if (user != null) {
        window.location.replace("user-information.html")
      } else {
        console.log('else' );
      }
    });  
  }
}

function UserProfile(){
  this.getUserInfo = function (){
    var currentUs = firebase.auth().currentUser;
    console.log('currentUser uid ' + currentUs.uid);
    console.log('getUserInfo');
    var name = $('input[name="name"]').val();
    var dob = $('input[name="field"]').val();
    var gender = $('input[name="gender"]:checked').val();
    var contact = $('input[name="contact"]').val();
    var hobby = [];
  $.each($("input[name='hobby']:checked"), function(){            
    hobby.push($(this).val());
  });
  
  writeUserData(name, dob, gender,contact,hobby);
  }
  
  function writeUserData( name, dob, gender,contact,hobby) {
     var currentUser = firebase.auth().currentUser;
    console.log('write data ' );
    firebase.database().ref('users/'+ currentUser.uid).set({
      name:name,
      dob: dob,
      gender: gender,
      contact: contact,
      hobby: hobby,
    });
  }
  
  this.getUserProfile = function (snap){
    //userprofile.on('value',function (user){});
    console.log('user uid ' + snap.uid);
    console.log( ' user name: ' + snap.val().name);
    $('input[name="name"]').val(snap.val().name);
    $('input[name="field"]').val(snap.val().dob);
    $('input[name="contact"]').val(snap.val().contact);
    if(snap.val().gender == 'male'){
      $('input[value="male"]').attr('checked',true);
    }else if(snap.val().gender == 'female') {
      $('input[value="female"]').attr('checked',true);
    }
    var hobby = snap.val().hobby;
    hobby.forEach(function(value){
      if(value.toLowerCase() == "reading book"){
        $('input[value="reading book"]').attr('checked',true);
      }else if(value.toLowerCase() == "internet"){
        $('input[value="internet"]').attr('checked',true);
      }else if(value.toLowerCase() == "play games"){
        $('input[value="play games"]').attr('checked',true);
      }
    });
  }
}

function ProfileEventHandler() {
  this.profileEvent = function () {
    profileEventAttach();
  }
  function profileEventAttach() {
  var userinfo = new UserProfile();
  var vd = new Validation();
  $('form[name="personal-info"]').validate({
    errorPlacement: function(error, element) {
      console.log('error place ' + error + element);
      var obj = $('[name="'+element.attr('name')+'"]');
      console.log('error elemenrt ' + element.attr('name') + 'object ' + obj );
      if (obj.length > 1) {
        error.insertAfter(obj.last().parent());
      } else {
        error.insertAfter(obj);
      }
    },
    rules : {
      name : "required",
      field : {
        required: true,
        date : true,
      },
      gender: 'required',
      contact : {
        required: true,
        minlength: 10,
      },
      hobby : 'required',
    },
    messages : {
      name : 'Please enter your name',
      field : {
        required : 'Please enter DOB ',
        date : 'Please enter valid date',
      }
    },
    submitHandler: function(form) {
      console.log('personal info');
      userinfo.getUserInfo();
      //userinfo.getUserProfile();
    }
  });
  
  $('#signout-btn').click(function() {
    var user = firebase.auth().currentUser;
    console.log('current user ' + user.email);
    firebase.auth().signOut();
    window.location = 'index.html';
  });
  
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user != null) {
      console.log('UID ' + user.uid);
      var userprofile = firebase.database().ref('users/'+ user.uid );
      userprofile.on('value',function(snap){
        if(snap.val() != null){
          console.log('snap' + snap.val());
          var userinfo = new UserProfile();
          userinfo.getUserProfile(snap);
        }
      });
      console.log(' userprofile exist' + userprofile);
    } else {
      console.log('user-information else' );
      window.location = 'index.html';
    }
  });
  }
}