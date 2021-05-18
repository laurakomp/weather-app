function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-city");
  let city = document.querySelector("#current-city");
  city.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

function searchCity(city) {
  let apiKey = "ebde765ff48c731ae66ed15747f18ce4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showWeatherCondition(response) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function showPosition(position) {
  let apiKey = "ebde765ff48c731ae66ed15747f18ce4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

navigator.geolocation.getCurrentPosition(showPosition);

//current location button - can't get it working for now ...

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 66;
//}

//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 19;
//}

let dateToday = new Date();

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];
  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];
  return `${day}, ${month} ${currentDate}, ${hours}:${minutes}`;
}

let currentDate = dateToday.getDate();
let displayTime = document.querySelector("#time-today");
displayTime.innerHTML = formatTime(dateToday);
