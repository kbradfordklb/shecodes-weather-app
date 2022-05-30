// Display current date + time
let now = new Date();
function newDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[now.getDay()];
  let currentHours= now.getHours();
  if (currentHours >0 && currentHours <= 12) {
    currentHours = currentHours;
  } else if (currentHours > 12) {
    currentHours = currentHours - 12;
  } else if (currentHours == 0) {
    hours = `12`;
  }
  
  let currentMins = now.getMinutes();
  if (currentMins < 10) {
    currentMins = `0${currentMins}`;
  }
  let fullDate = `${currentDay} ${currentHours}:${currentMins}`;
  return fullDate;
}
let timeDate = document.querySelector("#today-date");
timeDate.innerHTML = newDate(now);

//Display weather of current city upon page load
function displayCurrentWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#today-speed").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#today-humidity").innerHTML = ` ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#today-description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `images/icons/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

  let apiKey = "235ca990216eca6a451a3d1c3682fb84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Diego&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);

// Display weather info from city entered in search
function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#today-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#today-speed").innerHTML = ` ${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#today-humidity").innerHTML = ` ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#today-description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `images/icons/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  let apiKey = "235ca990216eca6a451a3d1c3682fb84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial `;
  axios.get(apiUrl).then(displayWeather);
}

//Current location button
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  let apiKey = "235ca990216eca6a451a3d1c3682fb84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//Convert Fahrenheit to Celsius
let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitTemp = null;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#today-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  temperatureElement.innerHTML = celsiusTemp;
}

//Convert Celsius to Fahrenheit
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemp = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//format date in forecast
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day];
}

//display forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML= `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
  if (index < 5) {
    forecastHTML = forecastHTML + `
    <div class="col forecast">
        <div class="text-center card-content">
          <img src="images/icons/${forecastDay.weather[0].icon}.png" 
          alt"" class="forecastIcon" width="60px"
          />
          <div class="day">${formatForecastDate(forecastDay.dt)}</div>
          
          <div class="temperature">
          <span class="max-temp">${Math.round(forecastDay.temp.max)}°|</span>
          <span class="low-temp">${Math.round(forecastDay.temp.min)}°</span>
          </div>
          
        </div> 
    </div>
  `;
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
    
}

function getForecast(coordinates) {
  let apiKey = "235ca990216eca6a451a3d1c3682fb84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}