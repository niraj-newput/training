function UserProfile(){
  this.getUserInfo = function (){
    var currentUs = firebase.auth().currentUser;
    console.log('cuurentUser uid ' + currentUs.uid);
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
      }else if(value.toLowerCase() == "play game"){
        $('input[value="play game"]').attr('checked',true);
      }
    });
  }
}

$(function() {
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