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
    $search = $wrapper.find('#search'),
    $form = $search.find('form'),
    $button = $('#searchbutton'),
    $location;

    // Identify the place using the url
    var location;
    var hashes = window.location.href.slice(window.location.href.indexOf('place/') + 6).split('?');
    location = hashes[0];

    getWeather(location);

  $button.on('click', function(e){
    e.preventDefault();
    var $search = $('#search');
    var location = $search.val();
    console.log(location + " = location");
    getWeather(location);
  });


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
        $city.text('city not found');

      } else {

        $city.text(data.name + ', ' + data.sys.country);
        $temperature.text(Math.round(data.main.temp) + ' °F / ' + Math.round((data.main.temp - 32) * (5 / 9)) + ' °C');
        $description.text(data.weather[0].description);
        $humidity.text('Humidity: ' + data.main.humidity + '%');
        $wind.text('Wind: ' + data.wind.speed + ' mph');

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

  var $location, $latitude, $longitude;

  var hashes = window.location.href.slice(window.location.href.indexOf('place/') + 6).split('?');
  location = hashes[0];

  if (location == "london") {
    latitude = 51.507351;
    longitude = -0.127758;
  }
  if (location == "new-york") {
    latitude = 40.712784;
    longitude = -74.005941;
  };
  if (location == "singapore") {
    latitude = 1.352083;
    longitude = 103.819836;
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
    latitude = -90.071532;
    longitude = 34.781768;
  };
  if (location == "san-francisco") {
    latitude = 34.781768;
    longitude = -122.419416;
  };
  if (location == "berlin") {
    latitude = 52.520007;
    longitude = 52.520007;
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
        console.log('lat = ' + latitude + '/ lng = ' + longitude);
        console.log(res);
      }
    })

    requestTime.done(function(data) {

      // console.log('data = ' + data);

      if (data.cod === '404') {
        console.log('Check what is wrong with timezonedb - no data');
      } else {
        console.log('json data should be extracted');

      };
    });
  };
  console.log(location + " = location / " + latitude + '= latitude / ' + longitude + '= longitude');

  getTime(latitude, longitude);

}); // end of doc ready



// function getForecastIoWeather(latitude, longitude) {
//
//   var requestWeather2 = $.ajax({
//   url:'https://api.forecast.io/forecast/6f7df3b994c4d8618a70f65fab6c2eaa/40.712784,-74.005941',
//   type: "GET",
//   dataType: 'jsonp',
//   success: function(res){
//     // console.log(res);
//   }
// })




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



// ----------AJAX DATA - to remove after selecting the data ---------------
 // http://api.openweathermap.org/data/2.5/weather?q=Stamford&apiKey=7271d3292aac8f43062a11e66a3aa1b0

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

 // ----------end of AJAX data to be removed----------------
