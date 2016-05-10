console.log("How are you feeling today?");
var snapShotData = {}
function setSaveSnapShotHandler(){
  $('#save').on('click', function(){
    var $tweet_data = [];
    var $userName = $('#user-name').text();
    for(var i = 0; i<$('#tweets-refreshed').children().length; i++){
      var $tweetsRefreshed = ('#tweets-refreshed').children();
      var $tweetText = $tweetsRefreshed[i].$('.tweet-text').text();
      var $screenName = $tweetsRefreshed[i].$('.screen-name').text();
      var $postedAt = $tweetsRefreshed[i].$('.posted-at').text();
      var $tweetObject = { text: $tweetText, tweet_text: $tweetText, screen_name: $screenName };
      $tweet_data.push($tweetObject);
    };
    var $weather_data = [];
    var $description = $('#description').text();
    var $temperature = $('#temperature').text();
    var $humidity = $('#humidity').text();
    var $wind = $('#wind').text();
    var $weatherData = { description: $description, temperature: $temperature, humidity: $humidity, wind: $wind };
    var $location = $('.place').text();

    snapShotData = {
      user_name: $userName,
      tweet_data: $tweetObject,
      weather_data: $weatherData,
      location: $location
    };
  saveSnapShot();
  });
};

function saveSnapShot(){
  $.ajax({
    method: 'post',
    url: '/api/snapshots',
    data: { snapshot: snapShotData },
  };
};
