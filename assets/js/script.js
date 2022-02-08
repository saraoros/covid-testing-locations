// start of global variables
var citySearchInput = document.querySelector('#searchInput');
var userCardEl = document.querySelector('.card');
var searchButton = document.querySelector('#search');
var recentsMenu = document.querySelector('#recents');
var locationContainer = document.querySelector('#locationContainer');
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var hereApi = 'IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U';
var opApi = '113200bab49467606bb2319ca3ecb8e8';
var map;



// Use that lat & lon to plug into the HERE api & initMap function
function getHereData(lat, lon) {
  var hereURL =
    'https://discover.search.hereapi.com/v1/discover?apikey=IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U&q=Covid&at=' +
    lat +
    ',' +
    lon +
    '&limit=10';
  fetch(hereURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.items.length; i++) {
        var li = document.createElement('li');
        li.classList.add('location-data');

        var p = document.createElement('p');
        p.classList.add('location-data-p');
        p.textContent = data.items[i].address.label;

        li.appendChild(p);
        locationContainer.appendChild(li);
      }
    });
}


// openweather api to capture the lat & lon of the cities inputed
function getLatLon() {
  var cityUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    citySearchInput.value +
    '&limit=5&appid=113200bab49467606bb2319ca3ecb8e8';
  // console.log('Get Lat Lon ', cityUrl);

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log('previous cities stored ', cities);
      cities.push([citySearchInput.value.trim(), lat, lon]);

      initMap(lat, lon);
      getHereData(lat, lon);
      localStorage.setItem('cities', JSON.stringify(cities));
    });
}





function search(event) {
  event.preventDefault();

  // calls saveSearch function to save to localstorage
  getLatLon();
  saveSearch();
}

function saveSearch() {
  userInputEl = document.querySelector("input[name='userInput']").value;

  var search = userInputEl;

  if (search !== '') {
    // pull from local storage
    var previousSearch =
      JSON.parse(window.localStorage.getItem('searchHistory')) || [];

    // variable for search input
    var currentSearch = {
      city: userInputEl,
    };

    //save to localStorage
    previousSearch.push(currentSearch);
    window.localStorage.setItem(
      'searchHistory',
      JSON.stringify(previousSearch)
    );
  }
  history();
}

function history() {
  var previousSearchHistory =
    JSON.parse(window.localStorage.getItem('searchHistory')) || [];

  previousSearchHistory.forEach(function (city) {
    var optionEl = document.createElement('option');
    optionEl.textContent = city.city;

    var selectEl = document.querySelector('#selectEl');
    selectEl.appendChild(optionEl);
  });
}

searchButton.addEventListener('click', search);
//recentsMenu.addEventListener('click', history);



// Initialize and add the map ** We NEED initMap ***
function initMap(lat, lon) {
  console.log('Calling google maps ....');
  // The location of the city searched
  const city = { lat: lat, lng: lon };
  
  // The map, centered at the city searched
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: city,
  });
  // The marker, positioned at the city searched
  const marker = new google.maps.Marker({
    position: city,
    map: map,
  });
}

