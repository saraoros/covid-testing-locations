var cityInput = document.querySelector('#cityName');
var userCardEl = document.querySelector('card');





// // TA Daniel said that something in the lines of this will be us connecting google maps API and the covid api
// const mapsData = getFromGMaps()
// const lat = <from mapsData>
// const long - <from mapData>
// const locationData = fetch(`<url>?lat=${lat}&long=${long}`)

// Start of tutor notes & To Do's:
//
// API to get get lat & lon: like the one from open weather API listed below
//add lat & lon(if we want to keep searches in a city) to an array example BELOW OR make an array with addresses to a specific city:
//var locations = [
//     ['Bondi Beach', -33.890542, 151.274856, 4],
//     ['Coogee Beach', -33.923036, 151.259052, 5],
//     ['Cronulla Beach', -34.028249, 151.157507, 3],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//   ];
//use that lat & lon to plug in HERE api & initMap function
// I think an event listener is needed to capture the user input and then place that user input INTO the URL (cityUrl) in place of the current 'London' city name

// openweather api to capture the lat & lon of the cities inputed
var cityUrl =
  'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=113200bab49467606bb2319ca3ecb8e8';
let map;
var cities = JSON.parse(localStorage.getItem('cities')) || [];

function getLatLon() {
  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      cities.push(['London', lat, lon]);
      localStorage.setItem('cities', JSON.stringify(cities));
    });
}

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  const melbourne = { lat: -37.8136, lng: 144.9631 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: new google.maps.LatLng(-33.92, 151.25),
  });
  // The marker, positioned at Uluru
  const markerUluru = new google.maps.Marker({
    position: uluru,
    map: map,
  });
  const markerMelbourne = new google.maps.Marker({
    position: melbourne,
    map: map,
  });
    for (i = 0; i < cities.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(cities[i][1], cities[i][2]),
        map: map
      });
}
}

getLatLon();

var formSubmitHandler = function (event) {
    // prevents page from refreshing
    event.preventDefault();
  
    // get value from input element??
    // *** this isn't working! Need help correcting it. -so ***
    cities = cityInput.value.trim();

  };

  userCardEl.addEventListener('click', formSubmitHandler);