function signIn() {
    var email = $('#signin-email').val();
    var password = $('#signin-password').val();
    
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
    $('#signin-result').addClass('show').removeClass('hidden');
    $('#signin-result label').text('sign in successful');
    console.log('user sign in');
}


function signUp() {
    var email = $('#email').val();
    var password = $('#pass_c').val();
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            $('#signup-result').addClass('show').removeClass('hidden');
            $('#signup-result label').text(errorMessage);
            console.log(errorMessage);
        }
        console.log(error);
    });
    // console.log($("#signUp"));
    // $("#signUpForm").addClass('hidden').removeClass('show');
    // $('#signIn').addClass('show').removeClass('hidden');
    $('#signup-result').addClass('show').removeClass('hidden')
    $('#signup-result label').text('sign up successful');
}

$(function() {
    $('#signup-link').click(function() {
        $('form[name="signIn"]').addClass('hidden');
        $('form[name="signUp"]').removeClass('hidden');
    });
    
    $('#signin-link').click(function() {
        $('form[name="signUp"]').addClass('hidden');
        $('form[name="signIn"]').removeClass('hidden');
    });
    
    $("form[name='signIn']").validate( {
        rules: {
            name: {
              required : true,
              letteronly: true,
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            }
        },
        messages: {
            name: "Please enter your name",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            email:{ 
                required: "Please enter a email address",
            }
        },
        submitHandler: function(form) {
          signIn();
        }
    });

    // custom method for confirm password 
    $.validator.addMethod("confirmPass", function (value, element){
        console.log(value);
        var flag = false;
        var password = $('#pass_c').val();
        if(value == password ) {
            console.log(true);
            flag = true;
        }
        console.log('password' + password);
        return flag;
    }, "please re-enter same password");
    
    //sign Up form validation
    $("form[name='signUp']").validate({
        rules: {
            name: "required",
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
            },
            address: "required"
        },
        messages: {
            name: "Please enter name",
            email: { 
              required: "Please enter a email address",
            },
            pass_confirmation: {
                required: "Please enter the password",
                minlength: "Your password must be at least 8 characters long",
            },
            address : "please enter your address"
        },
        submitHandler: function(form) {
            // form.submit();
            signUp();
        }
    });
    
    // firebase auth listner
    firebase.auth().onAuthStateChanged(function(user) {
        //console.log(user);
        
        if (user) {
            //$('#signout-btn').removeClass('hide');
            console.log('if' + user);
        } else {
            console.log('else' + user);
        }
    });  
});

      