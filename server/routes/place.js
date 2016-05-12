// ----------------------
// ****** Modules! ******
// ----------------------
var express   = require('express'),
    router    = express.Router(),
    Twitter   = require('twitter');
    /*
      'path' is needed because relative paths ../../ are considered malicious
      when importing modules in node. Example: importing routes in index.js
    */
    path      = require('path');

require('dotenv').config();

// SET UP TWITTER CLIENT
var client = new Twitter({

  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});


router.get('/place/:name', function(req, res, next) {
  var name = req.params.name;
  var refresh = req.query.refresh;
  var woeId;
  if (refresh === "true"){
    switch (name) {
      case "sydney": {
        woeId = 1105779;
        placeId = '0073b76548e5984f';
        break;
      }
      case "new-york": {
        woeId = 2459115;
        placeId = '27485069891a7938';
        break;
      }
      case "london": {
        woeId = 44418;
        placeId = '5de8cffc145c486b';
        break;
      }
      case "berlin": {
        woeId = 638242;
        placeId = '3078869807f9dd36';
        break;
      }
      case "austin": {
        woeId = 2357536;
        placeId = 'c3f37afa9efcf94b';
        break;
      }
      case "new-orleans": {
        woeId = 2458833;
        placeId = 'dd3b100831dd1763';
        break;
      }
      case "tel-aviv": {
        woeId = 1968212;
        placeId = '2edb6e240797c549';
        break;
      }
      case "san-francisco": {
        woeId = 2487956;
        placeId = '5a110d312052166f';
        break;
      }
      case "singapore": {
        woeId = 1062617;
        placeId = '2509b9adc1fedfd2';
        break;
      }
    }
  
    getAllTrendsPlace(woeId,res, placeId, name);
  
  } else {
    var trends = [];
    var tweets = [];
    var subtitle = "Saved Snapshots View"
    res.render('place', {trends: trends, name: name, tweets: tweets, subtitle: subtitle});
  }

});


// Get city trends from Twitter:
function getAllTrendsPlace(woeId, res, placeId, name){
  var localParams = {id: woeId};
  var globalParams = {id: 1};
  var localTrends = [];
  

  client.get('trends/place', localParams, function(localErr, localTweets, localResponse){ 
    if(localErr){
      console.log('localErr: ', localErr);
    } else {

      var localTrends = [];
      
      localTrends = parseTrends(localTweets, localResponse, localTrends);
      var trendsAsOf = localTrends[0].as_of;

      client.get('trends/place', globalParams, function(globalErr, globalTweets, globalResponse){ 
        if(globalErr){
          console.log('globalErr: ', globalErr);

        } else {
  
          var globalTrends = [];
          globalTrends = parseTrends(globalTweets, globalResponse, globalTrends);

          var limitedTrends = [];
          limitedTrends = createLimitedTrendsArray(globalTrends,localTrends);

          
          var hashtagTrends = [];
          getHashtagTrends(limitedTrends,hashtagTrends);
          console.log(hashtagTrends);

          var truncatedTweets = [];
          setTimeout(getTweets(hashtagTrends, trendsAsOf, placeId, truncatedTweets, hashtagTrends, res, name), 500);
          // console.log(truncatedTweets);

          // ******************************************************** //
          // TEMPORARY VIEW - RENDER THE local LOCAL AND GLOBAL TRENDS //
          // ******************************************************** //
          // res.render('place', {trends: hashtagTrends, name: name});

        };
      }); 
    };  
  });
};



function parseTrends(tweets, response, parsedList){
  var trendsParsed = JSON.parse(response.body);
  var trendsLength = trendsParsed[0].trends.length;
  if(trendsParsed[0]){
    for(var i=0; i < trendsLength; i++){  
      parsedList.push({ 
        name: trendsParsed[0].trends[i].name,
        query: trendsParsed[0].trends[i].query,
        tweet_volume: trendsParsed[0].trends[i].tweet_volume,
        as_of: trendsParsed[0].as_of
      });      
    };
  };
  return parsedList;
};

function getTrendsLocation(tweets,response,parsedList){

}


function createLimitedTrendsArray(globalTrends, localTrends){
  var globalTrendsArray = [];
  var localTrendsArray = [];
  var limitedTrends = [];
  for(var i=0; i<globalTrends.length; i++){
    globalTrendsArray.push(globalTrends[i].name);
  };

  // console.log(globalTrendsArray);


  // var localByVolume = localTrends.sort(function(a, b) {
  //   return (b.tweet_volume) - (a.tweet_volume)});

  // for(var i=0; i<localByVolume.length; i++){
  //   localTrendsArray.push(localByVolume[i].name);
  //   limitedTrends.push(localByVolume[i].name);
  // };

  for(var i=0; i<localTrends.length; i++){
    localTrendsArray.push(localTrends[i].name);
    limitedTrends.push(localTrends[i].name);
  };

  limitTrends(localTrendsArray, limitedTrends, globalTrendsArray);
  //console.log(185,limitedTrends);
  return limitedTrends;
};


function limitTrends(localTrends,limitedTrends,globalTrends){
  for(var i = 0; i<localTrends.length; i++){
    var check = localTrends[i];
    var place = limitedTrends.indexOf(check);
    for(var x = 0; x<globalTrends.length; x++){
      if(globalTrends[x] === check){
        limitedTrends.splice(place, 1);
      };
    };
  };
};

function getHashtagTrends(trends, hashtagTrends){
  var i = 0;
  var count = 0;
  // Limit to 10 local trends
  while((count<15)){
    //console.log(211,i);
    // Check if trend has a hashtag
    var trend = trends[i];

    if(!trend){
      break;
    }

    if(trend.indexOf('#') != -1){
      hashtagTrends.push(trend);
      count++;
    };
    i++;
  };
};


function getTweets(trends, trendsAsOf, placeId, truncatedTweets, hashtagTrends, res, name){
  var datetime = getCurrentDateTime();

  //LIMIT TWEETS TO JUST THE FIRST FIVE TRENDS
    queryParams = {
      q : 'place:'+placeId+trends.join(' OR '),
      count: 20,
      lang: 'en',
      result_type : 'mixed'
    }



    client.get('search/tweets', queryParams, function(error, tweets, response){
      if(error){
        console.log('Err: ', error);
      } else {
        truncatedTweets = produceLocalTweets(tweets,truncatedTweets);
        res.render('place', {trends: hashtagTrends, name: name, tweets: truncatedTweets, subtitle: datetime });
        // console.log("I get here!");
      };

    });
  //console.log(queryParams);
};


function produceLocalTweets(tweetsByHash,truncatedTweets){
  for(var i = 0; i<tweetsByHash.statuses.length; i++){
    var screenName = tweetsByHash.statuses[i].user.screen_name;
    var tweetText = tweetsByHash.statuses[i].text;
    var tweetHashes = [];
    for(var x = 0; x<tweetsByHash.statuses[i].entities.hashtags.length; x++){
      var hash = tweetsByHash.statuses[i].entities.hashtags[x].text;
      tweetHashes.push(hash);
    };
    var tweetTime = tweetsByHash.statuses[i].created_at;
    var tweet = {screen_name: screenName, text: tweetText, hashes: tweetHashes, posted_at: tweetTime};
    truncatedTweets.push(tweet);
  };
  // console.log(truncatedTweets);
  return truncatedTweets;
};

function getCurrentDateTime() {
  var date = new Date();
  var d = date.toDateString();
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  
  if (hours == 0) { hours = 12; }
  hours = hours < 10 ? "0" + hours : hours;
  // hours = ((hours + 11) % 12 + 1);
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  time = hours + ":" + minutes + " " + am_pm;
  var datetime = "Data Refreshed: " + d + "  " + time;  
  //console.log(datetime);
  return datetime;

    };







// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;