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
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
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
  )}°F`;
  document.querySelector("#today-low").innerHTML = `Low: ${Math.round(
    response.data.main.temp_min
  )}°F`;
  document.querySelector("#today-description").innerHTML =
    response.data.weather[0].description;
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
