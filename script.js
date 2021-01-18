$(document).ready(function() {
  // atttach event listener to id
  $("#search-button").on("click", function() {
    // create variable for city value
    var city = $("#city").val();
    if (city != ""){
      // clear search box
      $("#city").val("");
      getForecast(city);     
    }
    else{
      alert("Please fill in city");
    }
    
  });

  function getForecast(city){
    // create var for URL
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f0e59b5f6d1f779e08e9cf5cfcf9307c&units=metric"
    // call information using AJAX
    $.ajax({
      type: "GET",
      url: queryURL,
      success: function(data){
        console.log(data);
        // create div to hold move, store the data, and create an element for the data to be displayed
        // in this div we also added respective time and date of displayed weather

        var currentDayContainer = $("<div>");
        var currentDate = new Date();
        var tomorrowDate = new Date();
        tomorrowDate.setDate(currentDate.getDate()+1);

        var cityName = $("<h1>").text(data.name)
        currentDayContainer.append(cityName);
        var time = $("<h1>" + tomorrowDate.toDateString() + " at " + new Date().toLocaleTimeString());

        currentDayContainer.append(time);

        var imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        var imgIcon = $("<img>").attr("src", imgURL);
        currentDayContainer.append(imgIcon);
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


});


