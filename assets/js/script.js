var searchBoxEl = document.querySelector(".search-box");
var searchHistoryEl = document.querySelector(".search-history");
var weatherTodayEl = document.querySelector("#weather-today");
var todayIconEl = document.querySelector("#today-icon");
var resultTitleEl = document.querySelector("#result-title");
var resultTempEl = document.querySelector("#result-temp");
var resultWindEl = document.querySelector("#result-wind");
var resultHumidityEl = document.querySelector("result-humidity");
var resultUVEl = document.querySelector("#result-UV");
var uvIndexEl = document.querySelector("#UV-Index");


var cityNameEl = document.querySelector("textarea")
var cityName;



var displayCityData = function(data) {
// display current weather data
    // display weather data box
    weatherTodayEl.classList = "today-box";

    // display result title
    cityName = cityNameEl.value.trim().toLowerCase();
        resultTitleEl.textContent = cityName + " " + moment().format("L") + " ";
    var icon = data["current"]["weather"][0].icon;
        todayIconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
        todayIconEl.classList = "icon";
    
    // display current weather
    resultTempEl.textContent = "Temp: " + data["current"]["temp"] + " °F";
    resultWindEl.textContent = "Wind: " + data["current"]["wind_speed"] + " MPH";
    // resultHumidityEl.textContent = "Humidity: " + data["current"]["humidity"] + " %";
    resultUVEl.textContent = "UV Index: " ;
    uvIndexEl.textContent = data["current"]["uvi"];
        var uvIndex = parseInt(uvIndexEl.textContent);
        if(uvIndex <= 2) {
            uvIndexEl.classList = "low";
        } else if(uvIndex > 2 && uvIndex <= 5) {
            uvIndexEl.classList = "moderate";
        } else if(uvIndex > 5 && uvIndex <= 7) {
            uvIndexEl.classList = "high";
        } else if(uvIndex > 7 && uvIndex <= 10) {
            uvIndexEl.classList = "very-high";
        } else if (uvIndex > 10) {
            uvIndex.classList = "extreme"
        } else {
            uvIndexEl.textContent = "unknown"
        }


}  





  var getCityData = function(lat, long) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,alerts&units=imperial&appid=f92fdda14af7b15ad0ec974e795f4725";
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                displayCityData(data);
            });
        };
    });
};

var searchCity = function() {
    event.preventDefault();
    cityName = cityNameEl.value.trim().toLowerCase();
    console.log(cityName);

    getCityData(40.7128, 74.0060);
}





searchBoxEl.addEventListener("submit", searchCity);