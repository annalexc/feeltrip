console.log('...weather scripts say hi...');


$(document).ready(function(){

// ------ .env link doesn't work. Need to fix the link and remove key from here
  var $apiKey = "7271d3292aac8f43062a11e66a3aa1b0";
  // var apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

  var $wrapper = $('.weather-wrapper'),
    $panel = $wrapper.find('#weather-panel'),
    $city = $panel.find('#city'),
    $description = $panel.find('#description'),
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

    // var location = $("#name").text();
    // console.log(location + " = line 23 location");
    getWeather(location);

  // $button.on('click', function(e){
  //   e.preventDefault();
  //   var $search = $('#search');
  //   var location = $search.val();
  //   console.log(location + " = location line 27");
  //   getWeather(location);
  // });


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

    requestWeather.done(function(data) {

      console.log(data);

      if (data.cod === '404') {
        $city.text('city not found');
      } else {

        console.log($city + " = $city line 60");
        $city.text(data.name + ', ' + data.sys.country);
        $temperature.text('Temperature: ' + Math.round(data.main.temp) + ' F');
        // $description.text(titleCase(data.weather[0].description));
        $description.text(data.weather[0].description);
        $humidity.text('Humidity: ' + data.main.humidity + '%');
        $wind.text('Wind: ' + data.wind.speed + ' mph');
      };
    });




  }

}); // end of doc ready



//--------------ICONS-----------------
//
// switch (data.weather[0].icon) {
//   case '01d':
//     $icon.addClass('wi wi-day-sunny');
//     break;
//   case '02d':
//     $icon.addClass('wi wi-day-sunny-overcast');
//     break;
//   case '01n':
//     $icon.addClass('wi wi-night-clear');
//     break;
//   case '02n':
//     $icon.addClass('wi wi-night-partly-cloudy');
//     break;
// }
//
// switch (data.weather[0].icon.substr(0, 2)) {
//   case '03':
//     $icon.addClass('wi wi-cloud');
//     break;
//   case '04':
//     $icon.addClass('wi wi-cloudy');
//     break;
//   case '09':
//     $icon.addClass('wi wi-showers');
//     break;
//   case '10':
//     $icon.addClass('wi wi-rain');
//     break;
//   case '11':
//     $icon.addClass('wi wi-thunderstorm');
//     break;
//   case '13':
//     $icon.addClass('wi wi-snow');
//     break;
//   case '50':
//     $icon.addClass('wi wi-fog');
//     break;
// }
// });

//--------------END OF ICONS--------------------






// ----------AJAX DATA - to remove after selecting the data ---------------
 // http://api.openweathermap.org/data/2.5/weather?q=Stamford&apiKey=7271d3292aac8f43062a11e66a3aa1b0
// {
//   "coord": {
//     "lon": -73.54,
//     "lat": 41.05
//   },
//   "weather": [
//     {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01n"
//     }
//   ],
//   "base": "cmc stations",
//   "main": {
//     "temp": 283.199,
//     "pressure": 1008.12,
//     "humidity": 52,
//     "temp_min": 283.199,
//     "temp_max": 283.199,
//     "sea_level": 1026.7,
//     "grnd_level": 1008.12
//   },
//   "wind": {
//     "speed": 3.08,
//     "deg": 278.006
//   },
//   "clouds": {
//     "all": 0
//   },
//   "dt": 1462770525,
//   "sys": {
//     "message": 0.0049,
//     "country": "US",
//     "sunrise": 1462786901,
//     "sunset": 1462838405
//   },
//   "id": 4843564,
//   "name": "Stamford",
//   "cod": 200
// }
// ----------end of AJAX data to be removed----------------
