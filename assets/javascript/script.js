var searchHistory = document.getElementById("search-history");
var cityList = JSON.parse(localStorage.getItem("city-name")) || [];
var currentDayEl = document.getElementById("city");
var temperature = document.getElementById("temperature");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");


var getWeather = function(e) {
    e.preventDefault();
    searchHistory.innerHTML = "";
    var cityName = document.getElementById("city-name").value;
    getForecast(cityName);
    getCityDetails(cityName).then(res=>{
        setValueLocalStorage(res);
        populateSearchHistory();
    });
};

var getCityDetails = async function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=cbe5d9da9d040ae0db1e7af14bfcdcce";
    let outputData = await fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                currentDayEl.innerHTML = data.name;
                temperature.innerHTML = "Temperature: " + data.main.temp + "F";
                wind.innerHTML = "Windspeed: " + data.wind.speed + "MPH";
                humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
                return data.name;
                // displayWeather(data, city);
            });
        } else {
            alert("Error: city not found");
        }
    })
    .catch(function(error) {
        console.log(error);
        // alert("Unable to connect to OpenWeather");
    });
    return outputData;
};


// day 1 variables
var dayOneDate = document.getElementById("day-1");
var dayOneTempMin = document.getElementById("temp1-min");
var dayOneTempMax = document.getElementById("temp1-max");
var dayOneCondition = document.getElementById("condition1");

// day 2 variables
var dayTwoDate = document.getElementById("day-2");
var dayTwoTempMin = document.getElementById("temp2-min");
var dayTwoTempMax = document.getElementById("temp2-max");
var dayTwoCondition = document.getElementById("condition2");

// day 3 variables
var dayThreeDate = document.getElementById("day-3");
var dayThreeTempMin = document.getElementById("temp3-min");
var dayThreeTempMax = document.getElementById("temp3-max");
var dayThreeCondition = document.getElementById("condition3");

// day 4 variables
var dayFourDate = document.getElementById("day-4");
var dayFourTempMin = document.getElementById("temp4-min");
var dayFourTempMax = document.getElementById("temp4-max");
var dayFourCondition = document.getElementById("condition4");

// day 5 variables
var dayFiveDate = document.getElementById("day-5");
var dayFiveTempMin = document.getElementById("temp5-min");
var dayFiveTempMax = document.getElementById("temp5-max");
var dayFiveCondition = document.getElementById("condition5");

var getForecast = function(cityName){
    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=cbe5d9da9d040ae0db1e7af14bfcdcce";
    fetch(forecastApi).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
               // day 1
               let dayOne = moment(data.list[0].dt_txt).format("MMMM DD, YYYY");
               dayOneDate.textContent = dayOne;
               dayOneTempMin.textContent = "Low: " + (data.list[3].main.temp_min) + "F";
               dayOneTempMax.textContent = "High: " + (data.list[6].main.temp_max) + "F";
               dayOneCondition.textContent = (data.list[0].weather[0].description);

               // day 2
               let day2 = moment(data.list[7].dt_txt).format("MMMM DD, YYYY");
               dayTwoDate.textContent = day2;
               dayTwoTempMin.textContent = "Low: " + (data.list[7].main.temp_min) + "F";
               dayTwoTempMax.textContent = "High: " + (data.list[7].main.temp_max) + "F"; 
               dayTwoCondition.textContent = (data.list[7].weather[0].description);

               // day 3
               let day3 = moment(data.list[15].dt_txt).format("MMMM DD, YYYY");
               dayThreeDate.textContent = day3;
               dayThreeTempMin.textContent = "Low: " + (data.list[15].main.temp_min);
               dayThreeTempMax.textContent = "High: " + (data.list[15].main.temp_max); 
               dayThreeCondition.textContent = (data.list[15].weather[0].description);

               // day 4
               let day4 = moment(data.list[23].dt_txt).format("MMMM DD, YYYY");
               dayFourDate.textContent = day4;
               dayFourTempMin.textContent = "Low: " + (data.list[23].main.temp_min);
               dayFourTempMax.textContent = "High: " + (data.list[23].main.temp_max); 
               dayFourCondition.textContent = (data.list[23].weather[0].description);

               // day 5
               let day5 = moment(data.list[31].dt_txt).format("MMMM DD, YYYY");
               dayFiveDate.textContent = day5;
               dayFiveTempMin.textContent = "Low: " + (data.list[31].main.temp_min);
               dayFiveTempMax.textContent = "High: " + (data.list[31].main.temp_max); 
               dayFiveCondition.textContent = (data.list[31].weather[0].description);
               
            });
        };
    });
};

var setValueLocalStorage = function(cityName) {
    cityList.push(cityName);
    localStorage.setItem("city-name", JSON.stringify(cityList));
};

var populateSearchHistory = function() {
    for(let i = 0; i < cityList.length; i++) {
        let paragraph = document.createElement("p");
        let button = document.createElement("button");
        button.addEventListener("click", populateCityDetails);
        button.innerHTML = cityList[i];
        paragraph.append(button);
        searchHistory.append(paragraph);
    }
};

var populateCityDetails = function(e) {
    e.preventDefault;
    getCityDetails(e.target.innerHTML);
};

populateSearchHistory();
document.getElementById("search-button").addEventListener("click", getWeather);