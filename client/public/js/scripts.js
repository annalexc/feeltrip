console.log("How are you feeling today?");

$(function(){
  redirectToLoginHandler();
  logoutHandler();
});


function isLoggedInToFeelTrip(){
  var token = Cookies.get('jwt_token');
  return token ? true : false;
};

function redirectToLoginHandler(){
  // if(!isLoggedInToFeelTrip()){
  //   window.location.href = '/'; 
  // };
};

function logoutHandler(){
  $logout = $('.logout');
  $logout.on('click', function(){
    Cookies.remove('jwt_token');
    Cookies.remove('current_user');
    Cookies.remove('spotify_token');
    redirectToLoginHandler();
  });
};