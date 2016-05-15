$(function(){
  // console.log("Spotify!");
  
  handleSpotifyRedirection();
  setSpotifyLoginHandler();
  setSpotifyLogoutHandler();
  if (isLoggedInToSpotify()){
    $('#logout-spotify').show();
    $('#login-spotify').hide();
  };

});


function setSpotifyLoginHandler(){
  $login = $('#login-spotify-link');
  $login.on('click', function(){
    redirect();
  });
}


function setSpotifyLogoutHandler(){
  $logout = $('#logout-spotify-link');
  $logout.on('click', function(){
    console.log("you clicked me");
    Cookies.remove('spotify_token');
    window.location.href = ''; 
  });
}


var spotifyUser = {};

function redirect(){
  var baseURL = 'https://accounts.spotify.com/authorize';
  var queryParams = [
    'client_id=e9adbd15b57e4de7bc43f704b953af8e',
    'response_type=token',
    'redirect_uri=http://feeltrip.herokuapp.com/',
    'state=spotify_authorization_redirect'
    ].join('&');
    window.location = baseURL + '?' + queryParams;
}



var getFromHash = function( paramName ){
  // The Hash string, contains the hash character
  var hash = window.location.hash;
  // Remove the first character
  hash = hash.substr(1).split('&');

  // Returns only the elements that match the paramString criteria
  hash = hash.filter( function( paramString ){
    return paramString.indexOf(paramName) >= 0;
  });

  // Check if array has a length, and if it does, then find the first elememnt
  // If array is empty, it will return nothing
  return hash.length ? hash[0].split('=')[1] : null;

};


// If there is an access_token in the hash fragement, 
// save the access_token in a cookie 

var handleSpotifyRedirection = function(){
  // I'm looking for both the token and the state hash parameters
  var token = getFromHash('access_token');
  var state = getFromHash('state');

  // And if they both exist, set the cookie.
  if (token && state) {
    // Set the cookie!
    Cookies.set('spotify_token', token);
  }
}

function isLoggedInToSpotify(){
  var token = Cookies.get('spotify_token');
  // For now, I will assume if there is a Spotify token, then I'm logged in.
  return token ? true : false;
};

