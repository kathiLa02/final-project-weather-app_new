// show current date and time when reloadig

let now = new Date();

let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let formattedDate = `${day}, ${date}.${month}.${year}, ${hours}:${minutes}`;

h4.innerHTML = formattedDate;

// display city + temperature after searching

function weatherIcon(response) {
  let todayIcon = document.querySelector("#today-icon");
  let iconId = response.data.weather[0].icon;
  if (iconId === "01d" || iconId === "01n") {
    todayIcon.setAttribute("class", "fas fa-sun");
  } else if (iconId === "02d" || iconId === "02n") {
    todayIcon.setAttribute("class", "fas fa-cloud-sun");
  } else if (
    iconId === "03d" ||
    iconId === "03n" ||
    iconId === "04d" ||
    iconId === "04n"
  ) {
    todayIcon.setAttribute("class", "fas fa-cloud");
  } else if (iconId === "09d" || iconId === "09n") {
    todayIcon.setAttribute("class", "fas fa-cloud-rain");
  } else if (iconId === "10d" || iconId === "10n") {
    todayIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (iconId === "11d" || iconId === "11n") {
    todayIcon.setAttribute("class", "fas fa-bolt");
  } else if (iconId === "13d" || iconId === "13n") {
    todayIcon.setAttribute("class", "far fa-snowflake");
  } else if (iconId === "50d" || iconId === "50n") {
    todayIcon.setAttribute("class", "fas fa-smog");
  }
}

function feelsLike(response) {
  feel = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#feeling");
  feeling.innerHTML = `${feel}°C`;
  weatherIcon(response);
}

function showWind(response) {
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${Math.round(wind * 3.6)} km/h`;
  feelsLike(response);
}

function showHumidity(response) {
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humid}%`;
  showWind(response);
}

function showClouds(response) {
  let skyCondition = response.data.weather[0].description;
  skyCondition = skyCondition[0].toUpperCase() + skyCondition.substring(1);
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${skyCondition}`;
  showHumidity(response);
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("h2");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  showClouds(response);
}

function displayCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${currentCity}`;
  let apiKey = "7a4c012d25c9211da55cf57afddab488";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", displayCity);

function getCurrentTemperature(response) {
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
}

// change between °C and °F

function convertCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;

  let feelingTemperature = document.querySelector("#feeling");
  feelingTemperature.innerHTML = `  ${Math.round(feel)}°C`;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;

  let feelingTemperature = document.querySelector("#feeling");
  let fahrenheitFeelTemperature = (feel * 9) / 5 + 32;
  feelingTemperature.innerHTML = `${Math.round(fahrenheitFeelTemperature)}°F`;
}

let celsiusTemperature = null;
let feel = null;

let changeToCelsius = document.querySelector("#celsius-button");
changeToCelsius.addEventListener("click", convertCelsius);

let changeToFahrenheit = document.querySelector("#fahrenheit-button");
changeToFahrenheit.addEventListener("click", convertFahrenheit);
