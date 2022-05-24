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
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial `;
  axios.get(apiUrl).then(displayWeather);
}

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

//Current location button
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

//display forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="forecast-row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col forecast">
        <div class="text-center card-content">
          <div class="day">${formatDay(forecastDay.dt)}</div>
        </div>
        
        <div class="temperature">
              <span class="max-temp">${Math.round(forecastDay.temp.max)}°|</span>
              <span class="low-temp">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
          alt="clear" 
          id="today-icon" 
          width="120px"
          />
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  showFahrenheit();
}