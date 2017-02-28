$(function(){
  console.log("Spotify!");
  if (isLoggedInToSpotify()){
    setLoggedInState();
  };

});

function isLoggedInToSpotify(){
  var token = Cookies.get('spotify_token');
  // just because I have a token doesn't mean it's valid;
  // for now, I will assume if there is a token, then I'm logged in.
  return token ? true : false;
}

function setLoggedInState(){
  var token = Cookies.get('spotify_token');
  $.ajax({
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + token
    },
    success: function(response) {
      spotifyUser = response;
      var h3 = $('<h3>').text(spotifyUser.id);
      $('header').append(h3);
      $('#login-link').hide();
      $('#logout-link').show();

      getPlaylistsByCategory();
    }
  });
};


function getPlaylistsByCategory(){

  var token = Cookies.get('spotify_token');

  place = $('#place').text();

    switch (place){
    case 'SINGAPORE':
      var country = 'SG';
      break;
    case 'LONDON':
      var country = 'GB';
      break;
    case 'BERLIN':
      var country = 'DE';
      break;
    case 'SYDNEY':
      var country = 'AU';
      break;
    default:
      var country = 'US';
      break;
    };

    console.log(country);

  $.ajax({
    url: 'https://api.spotify.com/v1/browse/categories/toplists/playlists?country='+country+'&limit=3',
    headers: {
      'Authorization': 'Bearer ' + token
    },

    success: function(response) {
      console.log(response);
      //debugger
      // All playlists will be rendered from 
     
      var container = $('#playlists');
      response.playlists.items.forEach(function(playlist){
        var $iframe = $('<iframe>').attr('src', 'https://embed.spotify.com/?uri=' + playlist.uri);
        $iframe.attr('width','100%');
        // $iframe.attr('height','400px');
        $iframe.attr('frameborder','0');
        var $item = $('<li class="playlist">');
        // var $label = $('<label>').text(playlist.name);
        // var $img = $('<img class="cover">').attr('src', playlist.images[0].url);
        $item.append($iframe);
        container.append($item);


      });


    }
  });
};


