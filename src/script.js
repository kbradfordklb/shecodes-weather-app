// Display current date + time
let now = new Date();
function newDate(date) {
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
  document.querySelector("#today-low").innerHTML = `Low: ${Math.round(
    response.data.main.temp_min
  )}°`;
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
  document.querySelector("#today-low").innerHTML = `Low: ${Math.round(
    response.data.main.temp_min
  )}°`;
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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemp = response.data.main.temp;
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
function getCurrentLocation(event) {
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

//display forecast
function displayForecast () {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = `
    <div class="row">
    <div class="col forecast">
        <div class="text-center card-content">
          <div class="day">Monday</div>
          <div class="temperature">
          <span class="max-temp">65°|</span>
          <span class="low-temp">55°</span>
          </div>
          <i class="fa-solid fa-cloud"></i>
        </div> 
    </div>
  </div>
  `;
}

displayForecast();