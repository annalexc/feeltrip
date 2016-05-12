var renderSnapshots = function(snapShot){
  var userID = Cookies.getJSON("current_user")._id;
  var $location = $('#place').text();
  var $tweetsSaved = $('#tweets-saved')
  for(var i = 0; i<snapshotData.length; i++){
    if($location == snapshotData[i].location){
      var tweet = snapshotData[i].tweet_data;
      for(var x = 0; x< snapshotData[i].tweet_data.length; x++){
      var appendTweetText = ($('<p>').class('tweet-text').text(tweet[x].text);
      var appendTweetInfo = ($('<p>').class('info')
      var appendScreenName = ('-'$('<span>').class('screen-name').text(tweet[x].screen_name)', ');
      var appendPostedAt = ('-'$('<span>').class('posted-at').text(tweet[x].posted_at);
      $tweetsSaved.append($('<div>').class('tweet').append(appendTweetText, appendTweetInfo, appendScreenName, appendPostedAt);
    }
    var
  }

}

$.ajax({ url: "/api/snapshots",
  method: "get"
}).success(function(snapshotData){
  data.forEach( renderSnapshots );
});
