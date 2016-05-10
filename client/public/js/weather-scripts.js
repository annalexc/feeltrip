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


  $button.on('click', function(e){
    e.preventDefault();
    var $search = $('#search');
    var location = $search.val();
    console.log(location);
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

    requestWeather.done(function(data) {

      console.log(data);

      if (data.cod === '404') {
        $city.text('city not found');
      } else {

        console.log($city);
        $city.text(data.name + ', ' + data.sys.country);
        $temperature.text(Math.round(data.main.temp));
        // $description.text(titleCase(data.weather[0].description));
        $description.text(data.weather[0].description);
        $humidity.text('Humidity ' + data.main.humidity + '%');
        $wind.text('Wind: ' + data.wind.speed + ' mph');
      };
    });




  }

}); // end of doc ready


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
