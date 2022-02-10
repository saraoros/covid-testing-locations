// start of global variables
var citySearchInput = document.querySelector('#searchInput');
var userCardEl = document.querySelector('.card');
var searchButton = document.querySelector('#search');
var recentsMenu = document.querySelector('#recents');
var locationContainer = document.querySelector('#locationContainer');
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var mapText = document.querySelector('#map-text');
var hereApi = 'IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U';
var opApi = '113200bab49467606bb2319ca3ecb8e8';
var map;
var locations=[]; 


// Use that lat & lon to plug into the HERE api & initMap function
function getHereData(lat, lon) {
  locationContainer.innerHTML="";
  var hereURL =
    'https://discover.search.hereapi.com/v1/discover?apikey=IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U&q=Covid&at=' +
    lat +
    ',' +
    lon +
    '&limit=6';
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

        //add values to your locatioin variable 
        var locationInfo = {
          name: data.items[i].address.city, 
          lat: data.items[i].position.lat,
          lng: data.items[i].position.lng,
          title: data.items[i].title
        }
        //updating the Array values 
        locations.push(locationInfo); 

        li.appendChild(p);
        locationContainer.appendChild(li);
      }
      //all the location Info Array 
      console.log("All locations", locations); 
      initMap(); 
    });
}


// openweather api to capture the lat & lon of the cities inputed
function getLatLon() {
  var cityUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    citySearchInput.value +
    '&appid=113200bab49467606bb2319ca3ecb8e8';
    console.log(cityUrl)

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lon = data.coord.lon;
      var lat = data.coord.lat;
      
      console.log('previous cities stored ', cities);
      cities.push([citySearchInput.value.trim(), lat, lon]);

      initMap(lat, lon);
      getHereData(lat, lon);
      localStorage.setItem('cities', JSON.stringify(cities));
    });
}



function search(event) {
  event.preventDefault();
  mapText.remove();
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
  
  // //The map, centered at the city searched
  // const map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 8,
  //   center: city,
  // });
  // //The marker, positioned at the city searched
  // const marker = new google.maps.Marker({
  //   position: city,
  //   map: map,
  // });

  //Multiple - Markers on the MAP 
  console.log('Looping through all locations for  google maps ....', locations.length);
  var infowindow = new google.maps.InfoWindow();

  for (var index =0; index < locations.length; index++){
    var myCoords= { lat: locations[index].lat, lng: locations[index].lng };
    // console.log("myCoords", myCoords); 

    var mapOptions = {
        zoom: 14,
        center: myCoords,
    }; 

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // The marker, positioned at the locations searched
    const marker = new google.maps.Marker({
      position: myCoords,
      map: map,
      title: locations[index].title
    });
    // console.log(marker); 
    marker.setMap(map);



    // google.maps.event.addListener(marker, 'click', (function(marker, index) {
    //   return function() {
    //     infowindow.setContent(locations[index].name);
    //     infowindow.open(map, marker);
    //   }
    // })(marker, index));
  }
}

