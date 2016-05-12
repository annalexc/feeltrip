//
$(function(){
  setSaveSnapShotHandler();
});


function setSaveSnapShotHandler(){
  $('#save').on('click', function(){
    var tweet_data = [];
    var username = Cookies.getJSON('current_user').username;
    var userID = Cookies.getJSON('current_user')._id
    for(var i = 0; i<$('#tweets-refreshed').find('.tweet').length; i++){
      var $tweetsRefreshed = $('#tweets-refreshed').find('.tweet');
      var $tweetText = $($tweetsRefreshed[i]).find('.tweet-text').text();
      var $screenName = $($tweetsRefreshed[i]).find('.screen-name').text();
      var $postedAt = $($tweetsRefreshed[i]).find('.posted-at').text();
      var $tweetObject = { text: $tweetText, screen_name: $screenName, posted_at: $postedAt };
      tweet_data.push($tweetObject);

    };

    var weather_data = [];
    var $description = $('#description').text();
    var $temperature = $('#temperature').text();
    var $humidity = $('#humidity').text();
    var $wind = $('#wind').text();
    var $weatherData = { description: $description, temperature: $temperature, humidity: $humidity, wind: $wind };
    weather_data.push($weatherData);

    var $location = $('#place').text();

    var snapShotData = {
      username: username,
      userID: userID,
      tweet_data: tweet_data,
      weather_data: weather_data,
      location: $location
    };
    console.log(snapShotData);
    //saveSnapShot(snapShotData, $location);
  });
};

function saveSnapShot(snapShotData, location){
  location = location.toLowerCase().replace(' ','-');
  $.ajax({
    method: 'post',
    url: '/api/snapshots',
    data: { snapshot: snapShotData },
    success: function(data){
      console.log(data);
      window.location.href = location;
    }
  });
};
