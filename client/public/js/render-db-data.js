console.log("Yo");


var renderSnapshots = function(snapshotData, callback1, callback2){
  callback1 = callback1 || function(){};
  callback2 = callback2 || function(){};
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
  callback1();
  callback2();
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
    renderSnapshots(snapshotData, findHashTags, findScreenNames);
    }
  });
};


// Find all hashtags in place page and replace them with links
hashtag_regexp = /#([a-zA-Z0-9]+)/g;

function findHashTags(){
  $('.tweet-text').each(function() {
    $(this).html(addLinkToHashtags($(this).html()));
  });
};

function findScreenNames(){
  $('.screen-name').each(function() {
    $(this).html(addLinkToScreenNames($(this).html()));
  });
};

function addLinkToHashtags(text){
  hashtag_regexp = /#([a-zA-Z0-9]+)/g;
  console.log("I get here");
  return text.replace(
    hashtag_regexp,
      '<a class="dark-mint hashtag" target="_blank" href="http://twitter.com/search?q=%23$1">#$1</a>'
  );
};

function addLinkToScreenNames(text){
  screen_name_regexp = /@([a-zA-Z0-9_]+)/g;
  return text.replace(
    screen_name_regexp,
      '<a class="dark-mint name" target="_blank" href="http://twitter.com/$1">@$1</a>'
  );
};

$( document ).ready(function() {
  renderSaved();
});

