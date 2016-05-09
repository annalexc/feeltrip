$(function(){
  signUpHandler();
  closeModalHander();
  registerUserHandler();
});


function signUpHandler(){
  var $signUp = $('#sign-up');
  var $signUpForm = $('.sign-up-form');
  var $welcome = $('.welcome');

  $signUp.on('click', function(){ 
    $welcome.fadeOut(500).addClass('hidden');
    $signUpForm.fadeIn(500, function(){
      $signUpForm.removeClass('hidden');
    });
  });
};

function closeModalHander(){
  var $modalClose = $('#modal-close');
  var $signUpForm = $('.sign-up-form');
  var $welcome = $('.welcome');
  $modalClose.on('click', function(){
    $welcome.fadeIn(500).removeClass('hidden');
    $signUpForm.fadeOut(500, function(){
      $signUpForm.addClass('hidden');
    });
  });
}

function registerUserHandler(){
  var $signUpForm = $('.sign-up-form');
  $signUpForm.on('click', '#add-user', function(){
    $username = $signUpForm.find('input[name="username"]').val();
    $email = $signUpForm.find('input[name="email"]').val();
    $password = $signUpForm.find('input[name="password"]').val();

    var userData = {
        username: $username,
        email: $email,
        password: $password
      };
    //console.log(userData);
    registerUser(userData);
  })
};


function registerUser(userData){
  var $signUpForm = $('.sign-up-form');
  var $welcome = $('.welcome');
  var $message = $('#message');

  $.ajax({
    method: 'post',
    url: '/api/users',
    data: { user: userData },
    success: function(data){
      $message.text('Sign up successful. Please log in.');
      $welcome.fadeIn(500).removeClass('hidden');
      $signUpForm.fadeOut(500, function(){
        $signUpForm.addClass('hidden');
      });    
    }
  });
};

