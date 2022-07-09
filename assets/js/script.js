var searchBoxEl = document.querySelector(".search-box");
var searchHistoryEl = document.querySelector(".search-history");
var weatherTodayEl = document.querySelector("#weather-today");
var resultTitleEl = document.querySelector("#result-title");
var resultTempEl = document.querySelector("#result-temp");
var resultWindEl = document.querySelector("#result-wind");
var resultHumidityEl = document.querySelector("result-humidity");
var resultUVEl = document.querySelector("#result-UV");


var cityNameEl = document.querySelector("textarea");



//Function to covert address to Latitude and Longitude

  //Call the function with address as parameter
 















var searchCity = function() {
    event.preventDefault();
    var cityName = cityNameEl.value;
    console.log(cityName);

}

var getCityData = function(lat, long) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&appid=f92fdda14af7b15ad0ec974e795f4725";
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
            });
        };
    });
};

getCityData(40.7128, 74.0060);

searchBoxEl.addEventListener("submit", searchCity);