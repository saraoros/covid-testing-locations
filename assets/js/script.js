var cityInput = document.querySelector('#cityName');
//Find Location Button 
var citySearchInput = document.querySelector('#searchInput');
var userCardEl = document.querySelector('.card');
var searchButton = document.querySelector("#search");
var recentsMenu = document.querySelector("#recents")
var cityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=113200bab49467606bb2319ca3ecb8e8';
var map;
var cities = JSON.parse(localStorage.getItem('cities')) || [];
var hereApi = "IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U";


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

// I think an event listener is needed to capture the user input and then place that user input INTO the URL (cityUrl) in place of the current 'London' city name




// ** NEW COMMENTS AS OF MONDAY 2/7:********

//use that lat & lon to plug into the HERE api & initMap function

// BELOW is the 'HERE' API format we need! Current Lat & lon on the URL shows the city of Murrieta, CA.

// https://discover.search.hereapi.com/v1/discover?apikey=IWCxMl-XBQ7af097MScMolgpI49z7U7ow58AOleHG1U&q=Covid&at=33.55,-117.21&limit=10


// Maybe we can use this URL in this kind of format so that way we can get the lat & lon of the city the user inputs into the search box & get it to be applied into the 'HERE' Url: *** PLEASE FEEL FREE TO CHANGE THIS AS NEEDED!

// let testingLocation = "https://discover.search.hereapi.com/v1/discover?" + hereApi + "&q=Covid" + "&at=" + "lat"
// + "," + "lon" + "&limit=5";





// openweather api to capture the lat & lon of the cities inputed
function getLatLon() {

  var cityUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=5&appid=113200bab49467606bb2319ca3ecb8e8';
  console.log("Get Lat Lon ", cityUrl);

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      //cities.push(['London', lat, lon]);
      console.log("previous cities stored ", cities);
      cities.push([cityInput.value.trim(), lat, lon]);

      localStorage.setItem('cities', JSON.stringify(cities));

     
    });
}

// *** MOST LIKELY WON'T BE USING GOOGLE MAPS API ANY MORE ***

// Initialize and add the map
// function initMap() {
//   console.log("Calling google maps ....")
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.036 };
//   const melbourne = { lat: -37.8136, lng: 144.9631 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 8,
//     center: new google.maps.LatLng(-33.92, 151.25),
//   });
//   // The marker, positioned at Uluru
//   const markerUluru = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
//   const markerMelbourne = new google.maps.Marker({
//     position: melbourne,
//     map: map,
//   });
//   for (i = 0; i < cities.length; i++) {
//     marker = new google.maps.Marker({
//       position: new google.maps.LatLng(cities[i][1], cities[i][2]),
//       map: map
//     });
//   }
//   console.log("End of google maps" )
// }


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}


var formSubmitHandler = function (event) {
  // prevents page from refreshing
  event.preventDefault();

};

//userCardEl.addEventListener('click', formSubmitHandler);



function search () {
    // TO DO: fetch results from APIs
    

    // calls saveSearch function to save to localstorage 
    saveSearch();
}

function saveSearch () {
    userInputEl = document.querySelector("input[name='userInput']").value;

    var search = userInputEl;

    if (search !== "") {
        // pull from local storage
        var previousSearch = JSON.parse(window.localStorage.getItem("searchHistory")) || [];

        // variable for search input
        var currentSearch = {
            city: userInputEl
        }

        //save to localStorage
        previousSearch.push(currentSearch);
        window.localStorage.setItem("searchHistory", JSON.stringify(previousSearch));
    };
    //reloads page doesn't display duplicates of localStorage
    location.reload();
    history();
};

function history() {
    var previousSearchHistory = JSON.parse(window.localStorage.getItem("searchHistory")) || [];

    previousSearchHistory.forEach(function(city){
        var optionEl = document.createElement("option");
        optionEl.textContent = city.city

        var selectEl = document.querySelector("#selectEl")
        selectEl.appendChild(optionEl)
    });
};


searchButton.addEventListener("click", search);
recentsMenu.addEventListener("click", history);

  
 