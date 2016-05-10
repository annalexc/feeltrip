$(function(){
  loginHandler();
  signUpHandler();
  closeModalHander();
  registerUserHandler();
});

function loginHandler(){
  var $login = $('#login');
  var $loginForm = $('#login-form');

  $login.on('click', function(){
    $.ajax({
      method: 'post',
      url: '/api/auth',
      data: {
        username: $loginForm.find('[name=username]').val(),
        password: $loginForm.find('[name=password]').val()
      }
    }).success( function(data) {
        Cookies.set('jwt_token', data.token);
        //This is what sets us up as being logged in
 
    });
  });
};




function signUpHandler(){
  var $signUp = $('#sign-up');
  var $signUpForm = $('.sign-up-form');
  var $welcome = $('.welcome');

  $signUp.on('click', function(){ 
    $welcome.fadeOut(500).addClass('hidden');
    $signUpForm.removeClass('hidden').fadeIn(500);
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

