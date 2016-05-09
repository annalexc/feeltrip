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
        break;
      }
      case "newyork": {
        woeId = 2459115;
        break;
      }
    }
  
    getAllTrendsPlace(woeId,res);
  
  } else {
    var globalTrends = {
      name: 'No Global Trends.'
    }
    var localTrends = {
      name: 'No local Trends.'
    }
    // console.log("Got here");
    res.render('place', {trends: localTrends});
  }

});


// Get city trends from Twitter:
function getAllTrendsPlace(woeId, res){
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
  

          var globalTrendsArray = [];
          for(var i=0; i<globalTrends.length; i++){
            globalTrendsArray.push(globalTrends[i].name);
          };

          var localByVolume = localTrends.sort(function(a, b) {
            return (b.tweet_volume) - (a.tweet_volume)});

          var localTrendsArray = [];
          var limitedTrends = [];
          for(var i=0; i<localByVolume.length; i++){
            localTrendsArray.push(localByVolume[i].name);
            limitedTrends.push(localByVolume[i].name);
          };

          limitTrends(localTrendsArray, limitedTrends, globalTrendsArray);



          // console.log(limitedTrends);
          console.log(globalTrendsArray);

          // ******************************************************** //
          // TEMPORARY VIEW - RENDER THE local LOCAL AND GLOBAL TRENDS //
          // ******************************************************** //
          res.render('place', {trends: limitedTrends});

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
        tweet_volume: trendsParsed[0].trends[i].tweet_volume,
        as_of: trendsParsed[0].as_of
      });      
    };
  };
  return parsedList;
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



// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;