var getWeather = function(city) {
    var apiUrl = "link" + city + "rest of link";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        } else {
            alert("Error: city not found");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    });
};