// search variables
var searchBoxEl = document.querySelector(".search-box");
var searchHistoryEl = document.querySelector(".search-history");
    // user input
var cityNameEl = document.querySelector("textarea")
var cityName;
// current weather variables
var weatherTodayEl = document.querySelector("#weather-today");
var todayIconEl = document.querySelector("#today-icon");
var resultTitleEl = document.querySelector("#result-title");
var resultTempEl = document.querySelector("#result-temp");
var resultWindEl = document.querySelector("#result-wind");
var resultHumidityEl = document.querySelector("result-humidity");
var resultUVEl = document.querySelector("#result-UV");
var uvIndexEl = document.querySelector("#UV-Index");
// five-day forecast variables
var fiveDayTitleEl = document.querySelector("#five-day-title");
var fiveDayForecastEl = document.querySelector("#five-day-forecast");
// var dayOne = document.querySelector("#one-day");
// var dayTwo = document.querySelector("#two-day");
// var dayThree = document.querySelector("#three-day");
// var dayFour = document.querySelector("#four-day");
// var dayFive = document.querySelector("#five-day");




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
        // index background color based on status
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

    // 5-day forecast title
    fiveDayTitleEl.textContent = "5-Day Forecast:"

// display 5-day forecast data  
    // 5-day array
    var fiveDays = [
        data["daily"][0],
        data["daily"][1],
        data["daily"][2],
        data["daily"][3],
        data["daily"][4],
    ];
    console.log(fiveDays)
    // dynamically create 5-day forecast cards
    for (let i = 0; i < fiveDays.length; i++) {
       var day = document.createElement("div");
            day.classList = "forecast-card";
            day.textContent = "day";
            fiveDayForecastEl.appendChild(day);
        var date = document.createElement("h5");
            date.textContent = moment().add((i + 1), 'day').format("L");
            day.appendChild(date);
        var fiveDayIconBox = document.createElement("span");
            fiveDayIconBox.classList = "icon-box";
            day.appendChild(fiveDayIconBox);
        var fiveDayIcon = document.createElement("img");
            fiveDayIcon.classList = "icon"
            fiveDayIconBox.appendChild(fiveDayIcon);
            var icon5 = fiveDays[i]["weather"][0].icon;
            fiveDayIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon5 + "@2x.png");
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