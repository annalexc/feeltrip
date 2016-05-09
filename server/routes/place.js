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
      case "newyork": {
        woeId = 2459115;
        placeId = '27485069891a7938';
        break;
      }
      case "london": {
        woeId = 44418;
        placeId = '5de8cffc145c486b';
        break;
      }
    }
  
    getAllTrendsPlace(woeId,res, placeId);
  
  } else {
    var localTrends = {
      name: 'No local Trends.'
    }
    
    res.render('place', {trends: localTrends});
  }

});


// Get city trends from Twitter:
function getAllTrendsPlace(woeId, res, placeId){
  var localParams = {id: woeId};
  var globalParams = {id: 1};
  var localTrends = [];
  

  client.get('trends/place', localParams, function(localErr, localTweets, localResponse){ 
    if(localErr){
      console.log('localErr: ', localErr);
    } else {

      var localTrends = [];
      localTrends = parseTrends(localTweets, localResponse, localTrends);

      client.get('trends/place', globalParams, function(globalErr, globalTweets, globalResponse){ 
        if(globalErr){
          console.log('globalErr: ', globalErr);

        } else {
  
          var globalTrends = [];
          globalTrends = parseTrends(globalTweets, globalResponse, globalTrends);

          var limitedTrends = [];
          limitedTrends = createLimitedTrendsArray(globalTrends,localTrends);

          var hashtagTrends = [];
          hashtagTrends = getHashtagTrends(limitedTrends);

          getTweets(hashtagTrends, placeId);
          

          // ******************************************************** //
          // TEMPORARY VIEW - RENDER THE local LOCAL AND GLOBAL TRENDS //
          // ******************************************************** //
          res.render('place', {trends: hashtagTrends, tweets: tweets});

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

function getHashtagTrends(trends){
  var hashtagTrends = [];
  for(var i = 0; i < trends.length; i++){
    // Check if trend has a hashtag
    var trend = trends[i];
    if(trend.indexOf('#') != -1){
      hashtagTrends.push(trend);
    };
  };
  return hashtagTrends;
};


function getTweets(trends, placeId){
  //LIMIT TWEETS TO JUST THE FIRST FIVE TRENDS

  for (var i=0; i<5; i++){
    queryParams = {
      q : 'place:'+placeId+trends[i],
      count: 3,
      result_type : 'mixed'
    }

    client.get('search/tweets', queryParams, function(error, tweets, response){
      if(error){
        console.log('Err: ', error);
      } else {
        console.log(tweets);
      };

    });
  };
};



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;