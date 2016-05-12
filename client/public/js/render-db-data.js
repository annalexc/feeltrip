console.log("Yo");


var renderSnapshots = function(snapshotData){
  console.log("Snapshot Data in Render Snapshots is", snapshotData);
  var $location = $('#place').text();
  var $tweetsSaved = $('#tweets-saved');
  $tweetsSaved.empty();
  for(var i = 0; i<snapshotData.length; i++){
    if($location == snapshotData[i].location){
      var tweet = snapshotData[i].tweet_data;
      for(var x = 0; x< snapshotData[i].tweet_data.length; x++){
        var $tweet = $('<div>').addClass('tweet');
        var $tweetText = ($('<p>').addClass('tweet-text').text(tweet[x].text));
        var $tweetInfo = ($('<p>').addClass('info'));
        var $screenName = ($('<span>').addClass('screen-name').text(tweet[x].screen_name));
        var $postedAt = ($('<span>').addClass('posted-at').text(tweet[x].posted_at));
        $tweetInfo.append($screenName);
        $tweetInfo.append($postedAt);
        $tweet.append($tweetText);
        $tweet.append($tweetInfo);
        $tweetsSaved.append($tweet);


        // $tweetsSaved.append($('<div>').addClass('tweet').append(appendTweetText));

      };
    };
  };
};

function renderSaved(){
  var userID = Cookies.getJSON("current_user")._id;
  $.ajax({
    url: "/api/snapshots/"+userID,
    method: "get",
    success: function(snapshotData){
    //data.forEach( renderSnapshots );
    // renderSnapshots(snapShotData);
    console.log("Snapshot Data is:", snapshotData);
    renderSnapshots(snapshotData);
    }
  });
};

$( document ).ready(function() {
    renderSaved();
});

//renderSaved();
