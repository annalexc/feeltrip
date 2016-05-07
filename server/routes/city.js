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


router.get('/city/:name', function(req, res, next) {
  var name = req.params.name;
  var refresh = req.query.refresh;
  var woeId;
  if (refresh === "true"){
    switch (name) {
      case "sydney": {
        woeId = 1105779;
        break;
      }
    }
  
    getAllTrendsPlace(woeId,res);
  
  } else {
    var globalTrends = {
      name: 'No Global Trends.'
    }
    var cityTrends = {
      name: 'No City Trends.'
    }
    console.log("Got here");
    res.render('city', {globalTrends: globalTrends, cityTrends: cityTrends});
  }

});


// Get city trends from Twitter:
function getAllTrendsPlace(woeId, res){
  var cityParams = {id: woeId};
  var globalParams = {id: 1};
  var cityTrends = [];
  
  // console.log("i get here and params is", params);
  

  client.get('trends/place', cityParams, function(cityErr, cityTweets, cityResponse){ 
    if(cityErr){
      console.log('cityErr: ', cityErr);
    } else {
      //console.log("Global trends array is:", globalTrends); 
      // var cityTrendsParsed = JSON.parse(cityResponse.body);
      // var cityTrendsLength = cityTrendsParsed[0].trends.length;
      // if(cityTrendsParsed[0]){
      //   for(var i=0; i < cityTrendsLength; i++){  
      //     cityTrends.push({ 
      //       name: cityTrendsParsed[0].trends[i].name, 
      //       tweet_volume: cityTrendsParsed[0].trends[i].tweet_volume,
      //       as_of: cityTrendsParsed[0].as_of
      //     });      
      //   };
      // };
      var cityTrends = [];
      cityTrends = parseTrends(cityTweets, cityResponse, cityTrends);


      client.get('trends/place', globalParams, function(globalErr, globalTweets, globalResponse){ 
        if(globalErr){
          console.log('globalErr: ', globalErr);

        } else {
        //   var globalTrendsParsed = JSON.parse(globalResponse.body);
        //   var globalTrendsLength = globalTrendsParsed[0].trends.length;
        //   if(globalTrendsParsed[0]){
        //     for(var i=0; i < globalTrendsLength; i++){  
        //       globalTrends.push({ 
        //         name: globalTrendsParsed[0].trends[i].name, 
        //         tweet_volume: globalTrendsParsed[0].trends[i].tweet_volume,
        //         as_of: globalTrendsParsed[0].as_of
        //       });      
        //     };
        //   };
        // };
          var globalTrends = [];
          globalTrends = parseTrends(globalTweets, globalResponse, globalTrends);
          console.log("Global trends is:", globalTrends);
          console.log("City trends is:", cityTrends);

          // ******************************************************** //
          // TEMPORARY VIEW - RENDER THE CITY LOCAL AND GLOBAL TRENDS //
          // ******************************************************** //
          res.render('city', {globalTrends: globalTrends, cityTrends:cityTrends});

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





// ----------------------
// ****** Exports! ******
// ----------------------
module.exports = router;