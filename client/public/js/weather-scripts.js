console.log('...weather scripts say hi...');


$(document).ready(function(){

  var $apiKey = "7271d3292aac8f43062a11e66a3aa1b0";

  var $wrapper = $('.weather-wrapper'),
    $panel = $wrapper.find('#weather-panel'),
    $city = $panel.find('#city'),
    $description = $panel.find('#description'),
    $icon = $panel.find('#weather-icon'),
    $temperature = $panel.find('#temperature'),
    $humidity = $panel.find('#humidity'),
    $wind = $panel.find('#wind'),
    $localtime = $panel.find('#localtime');
    $sunRiseSet = $panel.find('#sunRiseSet');

    // Identify the place using the url
  var location;
  var hashes = window.location.href.slice(window.location.href.indexOf('place/') + 6).split('?');
  location = hashes[0];

  getWeather(location);

  function getWeather(taco) {

    var requestWeather = $.ajax({
      dataType: 'json',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        q: taco,
        units: 'imperial',
        appid: $apiKey
      }
    });

    $icon.removeClass();

    requestWeather.done(function(data) {

      if (data.cod === '404') {
        $city.text('something went wrong, try again');

      } else {

        $city.text(data.name + ', ' + data.sys.country);
        $temperature.text(Math.round(data.main.temp) + ' °F / ' + Math.round((data.main.temp - 32) * (5 / 9)) + ' °C');
        $description.text(data.weather[0].description);
        $humidity.text('Humidity: ' + data.main.humidity + '%');
        $wind.text('Wind: ' + data.wind.speed + ' mph');
        // $sunRiseSet.text('Sunrise: ' + convertTime(data.sys.sunrise) + ' |Sunset: ' + convertTime(data.sys.sunset));


        switch (data.weather[0].icon) {
          case '01d':
            $icon.addClass('wi wi-day-sunny');
            break;
          case '01n':
            $icon.addClass('wi wi-night-clear');
            break;
          case '02d':
            $icon.addClass('wi wi-day-sunny-overcast');
            break;
          case '02n':
            $icon.addClass('wi wi-night-partly-cloudy');
            break;
        }

        switch (data.weather[0].icon.substr(0, 2)) {
          case '03':
            $icon.addClass('wi wi-cloud');
            break;
          case '04':
            $icon.addClass('wi wi-cloudy');
            break;
          case '09':
            $icon.addClass('wi wi-showers');
            break;
          case '10':
            $icon.addClass('wi wi-rain');
            break;
          case '11':
            $icon.addClass('wi wi-thunderstorm');
            break;
          case '13':
            $icon.addClass('wi wi-snow');
            break;
          case '50':
            $icon.addClass('wi wi-fog');
            break;
        }
      };
    });
  }


  //***************************************
  //-------for timezonedb------------------
  //***************************************

  var $latitude,
      $longitude,
      $timestamp;


  if (location == "london") {
    latitude = 51.507351;
    longitude = -0.127758;
  };
  if (location == "new-york") {
    latitude = 40.712784;
    longitude = -74.005941;
  };
  if (location == "singapore") {
    latitude = 1.2896700;
    longitude = 103.8500700;
  };
  if (location == "austin") {
    latitude = 30.267153;
    longitude = -97.743061;
  };
  if (location == "sydney") {
    latitude = -33.867487;
    longitude = 151.206990;
  };
  if (location == "new-orleans") {
    latitude = 29.951066;
    longitude = -90.071532;
  };
  if (location == "tel-aviv") {
    latitude = 32.0808800;
    longitude = 34.7805700;
  };
  if (location == "san-francisco") {
    latitude = 37.774929;
    longitude = -122.419416;
  };
  if (location == "berlin") {
    latitude = 52.520007;
    longitude = 13.4050;
  };


  function getTime(latitude, longitude) {

    var $timezonedbKey = "IQATFHPIVIXW";
    var requestTime = $.ajax({
    url:'http://api.timezonedb.com',
    type: "GET",
    data: {
      key: $timezonedbKey,
      format: 'json',
      lat: latitude,
      lng: longitude
    },

      success: function(res){
        // console.log('lat = ' + latitude + '/ lng = ' + longitude);
        // console.log(res);
      }
    })

    requestTime.done(function(data) {

      if (data.cod === '404') {

      } else {
        $timestamp = data.timestamp;
        if ($timestamp !== 0) {
        $localtime.text('Local Time:  ' + convertTime($timestamp));
        }
        // console.log("$timestamp= " + $timestamp);
      };
    });
  };

  function convertTime (timestamp){
    var theDate = new Date(timestamp * 1000);
    dateString = theDate.toGMTString();
    return dateString.slice(0, dateString.length-4);
  }

  getTime(latitude, longitude);

}); // end of doc ready



//-------------------Ajax data from timezonedb-----------------------------

// <?xml version="1.0" encoding="UTF-8"?>
// <result>
//     <status>OK</status>
//     <message></message>
//     <countryCode>GB</countryCode>
//     <zoneName>Europe/London</zoneName>
//     <abbreviation>BST</abbreviation>
//     <gmtOffset>3600</gmtOffset>
//     <dst>1</dst>
//     <timestamp>1463073122</timestamp>
// </result>

//-------------------End of Ajax data from timezonedb-----------------------------



// ----------openweathermap DATA - to remove after selecting the data ---------------

 //   "coord": {
 //     "lon": -74.01,
 //     "lat": 40.71
 //   },
 //   "weather": [
 //     {
 //       "id": 804,
 //       "main": "Clouds",
 //       "description": "overcast clouds",
 //       "icon": "04d"
 //     }
 //   ],
 //   "base": "cmc stations",
 //   "main": {
 //     "temp": 289.111,
 //     "pressure": 1022.51,
 //     "humidity": 33,
 //     "temp_min": 289.111,
 //     "temp_max": 289.111,
 //     "sea_level": 1036.45,
 //     "grnd_level": 1022.51
 //   },
 //   "wind": {
 //     "speed": 2.24,
 //     "deg": 253.001
 //   },
 //   "clouds": {
 //     "all": 92
 //   },
 //   "dt": 1462917806,
 //   "sys": {
 //     "message": 0.0042,
 //     "country": "US",
 //     "sunrise": 1462873353,
 //     "sunset": 1462924971
 //   },
 //   "id": 5128581,
 //   "name": "New York",
 //   "cod": 200

 // ----------end of openweathermap data ----------------
