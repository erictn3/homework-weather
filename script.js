$(document).ready(function() {
  // converts string from localstorage back to an array 
  var cities = JSON.parse(localStorage.getItem("cities")) || [];

  for (var i = 0; i < cities.length; i++){
    var cityName = $("<li>").text(cities[i]);
    $(".history").prepend(cityName);
  }

  // attach event listener to id
  $("#search-button").on("click", function() {
    // create variable for city value
    var city = $("#city").val();
    // excludes empty and repeated values 
    if (city != ""){
      // if (city != "" && !cities.includes(city)){
      // clear search box
      $("#city").val("");
      cities.push(city);
      // storage saves key value pairs of array as a string 
      localStorage.setItem("cities", JSON.stringify(cities));
      // TODO: add new cityname to ul
      // made a new element (li) and appended city to history ul
      var cityName = $("<li>").text(city);
      $(".history").prepend(cityName);
      getCurrentDate(city);   
      getForecast(city);
    }
    else{
      alert("Invalid response");
    }
  });

  function getCurrentDate(city){
    // create var for URL
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f0e59b5f6d1f779e08e9cf5cfcf9307c&units=metric"
    // call information using AJAX
    $.ajax({
      type: "GET",
      url: queryURL,
      success: function(data){
        console.log(data);
        // create div to hold move, store the data, and create an element for the data to be displayed

        var currentDayContainer = $("<div>");
        var currentDate = new Date();
        var cityName = $("<h1>").text(data.name)
        currentDayContainer.append(cityName);
        
        var imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        var imgIcon = $("<img>").attr("src", imgURL);
        currentDayContainer.append(imgIcon);
        
        // in this div we also added respective time and date of displayed weather        
        var time = $("<h4>").text(currentDate.toDateString() + " at " + new Date().toLocaleTimeString());
        currentDayContainer.append(time);

        var temperature = data.main.temp;
        var pTemp = $("<h4>").text("Temperature: " + temperature + "°C");
        currentDayContainer.append(pTemp);

        var humidity = data.main.humidity;
        var pHumid = $("<h4>").text("Humidity: " + humidity + "%");
        currentDayContainer.append(pHumid);
        $("#today").prepend(currentDayContainer);

        var windSpeed = data.wind.speed;
        var pwindSpeed = $("<h4>").text("Wind Speed: " + windSpeed + "KPH");

        currentDayContainer.append(pwindSpeed);
      }
    });
  }

  function getForecast(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f0e59b5f6d1f779e08e9cf5cfcf9307c&units=metric"
    // call information using AJAX
    $.ajax({
      type: "GET",
      url: queryURL,
      success: function(data){
        console.log(data);
        var currentDate = new Date();
        var outerDivForecast = $("<div>");
        $("#forecast").prepend(outerDivForecast);   

        // For loop number through 5 day forecast
        var numberOfDays = 5;
        for (var i = 1; i <= numberOfDays; i++){
          var nextDay = new Date();
          nextDay.setDate(currentDate.getDate() + i);
          
          // TODO: append to 5 day forecast outer div
        }

      }
    });
  }




});


