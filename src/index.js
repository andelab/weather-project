let timeNow = new Date();
let p = document.querySelector("#dan");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[timeNow.getDay()];
let hour = timeNow.getHours();
let minutes = timeNow.getMinutes();
let apiKey = "afe9ee1dd9602aa3cd50d8dcf4b72270";
p.innerHTML = `${day}, ${hour}:${minutes}`;
function searching(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-text");
  let p = document.querySelector("#split");
  p.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#form-search");
form.addEventListener("submit", searching);
function temperature(event) {
  event.preventDefault();
  let celsius = document.querySelector("#todays-temperature");
  celsius.innerHTML = 27;
}
let celsiusTemperature = document.querySelector("#celsiusButton");
celsiusTemperature.addEventListener("click", temperature);
function ftemperature(event) {
  event.preventDefault();
  let fahren = document.querySelector("#todays-temperature");
  fahren.innerHTML = 80;
}
let fahrenTemperature = document.querySelector("#fahrenButton");
fahrenTemperature.addEventListener("click", ftemperature);
/////
function showTemperature(response) {
  let nowTemperature = Math.round(response.data.main.temp);
  let p = document.querySelector("#todays-temperature");
  p.innerHTML = `${nowTemperature}`;
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=afe9ee1dd9602aa3cd50d8dcf4b72270&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function submission(event) {
  event.preventDefault();
  let city = document.querySelector("#input-text");
  searchCity(city.value);
}
let searchFor = document.querySelector(".search");
searchFor.addEventListener("submit", submission);
///
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(showTemperature);
  axios.get(apiUrl2).then(getCurrentCity);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);
function getCurrentCity(response) {
  let p = document.querySelector("#split");
  let currentCityLocation = response.data.name;
  p.innerHTML = `${currentCityLocation}`;
}
