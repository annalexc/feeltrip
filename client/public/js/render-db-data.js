console.log("Yo");

"2016-05-12T16:57:14.204Z"
function parseTimeStamp(rawTimeStamp){
  var year = rawTimeStamp.substring(0, 4);
  var monthRaw  = rawTimeStamp.charAt(5)+rawTimeStamp.charAt(6);
  switch (monthRaw){
    case '01':
      var month = 'January';
      break;
    case '02':
      var month = 'February';
      break;
    case '03':
      var month = 'March';
      break;
    case '04':
      var month = 'April';
      break;
    case '05':
      var month = 'May';
      break;
    case '06':
      var month = 'June';
      break;
    case '07':
      var month = 'July';
      break;
    case '08':
      var month = 'August';
      break;
    case '09':
      var month = 'September';
      break;
    case '10':
      var month = 'October';
      break;
    case '11':
      var month = 'November';
      break;
    case '12':
      var month = 'December';
      break;
    default:
      var month = '';
  };
  var dayRaw  = rawTimeStamp.charAt(8)+rawTimeStamp.charAt(9);
  switch (dayRaw){
    case '01':
      var day = '1';
      break;
    case '02':
      var day = '2';
      break;
    case '03':
      var day = '3';
      break;
    case '04':
      var day = '4';
      break;
    case '05':
      var day = '5';
      break;
    case '06':
      var day = '6';
      break;
    case '07':
      var day = '7';
      break;
    case '08':
      var day = '8';
      break;
    case '09':
      var day = '9';
      break;

    default:
      var day = dayRaw;
  };
  var hourRaw  = rawTimeStamp.charAt(11)+rawTimeStamp.charAt(12);
  switch (hourRaw){
    case '00':
      var hour = '12';
      break;
    case '01':
      var hour = '1';
      break;
    case '02':
      var hour = '2';
      break;
    case '03':
      var hour = '3';
      break;
    case '04':
      var hour = '4';
      break;
    case '05':
      var hour = '5';
      break;
    case '06':
      var hour = '6';
      break;
    case '07':
      var hour = '7';
      break;
    case '08':
      var hour = '8';
      break;
    case '09':
      var hour = '9';
      break;
    case '10':
      var hour = '10';
      break;
    case '11':
      var hour = '11';
      break;
    case '12':
      var hour = '12';
      break;
    case '13':
      var hour = '1';
      break;
    case '14':
      var hour = '2';
      break;
    case '15':
      var hour = '3';
      break;
    case '16':
      var hour = '4';
      break;
    case '17':
      var hour = '5';
      break;
    case '18':
      var hour = '6';
      break;
    case '19':
      var hour = '7';
      break;
    case '20':
      var hour = '8';
      break;
    case '21':
      var hour = '9';
      break;
    case '22':
      var hour = '10';
      break;
    case '23':
      var hour = '11';
      break;
    case '24':
      var hour = '12';
      break;

    default:
      var hour = '';
  };
  var minute = rawTimeStamp.charAt(14)+rawTimeStamp.charAt(15);
  var amPm;

  function genAmPm(){
    console.log(hour);
    if(parseInt(hourRaw)<12){

      amPm = 'am';
    } else{
      amPm = 'pm';
    }
  };
  genAmPm();
  var timeStamp = 'Saved on ' + month + ' ' + day + ', ' + year + ' at ' + hour + ':' + minute + amPm + ' GMT(EST+4)';
  return timeStamp;
};



var renderSnapshots = function(snapshotData, callback1, callback2){
  callback1 = callback1 || function(){};
  callback2 = callback2 || function(){};
  console.log("Snapshot Data in Render Snapshots is", snapshotData);
  var $location = $('#place').text();
  var $tweetsSaved = $('#tweets-saved');
  $tweetsSaved.empty();
  for(var i = 0; i<snapshotData.length; i++){
    if($location == snapshotData[i].location){
      var savedTime = parseTimeStamp(snapshotData[i].createdAt);
      console.log(snapshotData[i].createdAt);
      $tweetsSaved.append($('<div>').addClass('saved-time').text(savedTime));
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
