
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
  this.signInValidation = function(){
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
      }
    });
    this.getSignInEmailPassword();
  }
    
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
    
  this.signUpValidation = function(){
    $("form[name='signUp']").validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        pass_confirmation: {
          required: true,
          minlength: 8
        },
        pass: {
          confirmPass : true,
        }
      },
      messages: {
        email: { 
          required: "Please enter a email address",
        },
        pass_confirmation: {
          required: "Please enter the password",
          minlength: "Your password must be at least 8 characters long",
        }
      },
      submitHandler: function(form) {
      }
    });
    this.getSignUpEmailPassword();
  }
    
  this.getSignUpEmailPassword = function(){
    var email = $('#email').val();
    var password = $('#pass_c').val();
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
      console.log(error);
    });
  }
};


