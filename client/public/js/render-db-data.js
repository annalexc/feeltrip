console.log("Yo");


var renderSnapshots = function(snapshotData){
  console.log("Snapshot Data in Render Snapshots is", snapshotData);
  // var $location = $('#place').text();
  // var $tweetsSaved = $('#tweets-saved');
  // $tweetsSaved.empty();
  // for(var i = 0; i<snapshotData.length; i++){
  //   if($location == snapshotData[i].location){
  //     var tweet = snapshotData[i].tweet_data;
  //     for(var x = 0; x< snapshotData[i].tweet_data.length; x++){
  //       var appendTweetText = ($('<p>').class('tweet-text').text(tweet[x].text));
  //       var appendTweetInfo = ($('<p>').class('info'));
  //       var appendScreenName = ($('<span>').class('screen-name').text(tweet[x].screen_name));
  //       var appendPostedAt = ($('<span>').class('posted-at').text(tweet[x].posted_at));
  //       $tweetsSaved.append($('<div>').class('tweet').append(appendTweetText));
  //     };
  //   };
  // };
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

//renderSaved();
