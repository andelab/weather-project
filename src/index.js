function timeNow(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = ` 0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return ` ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
let date= new Date(timestamp *1000);
let day= date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

return days[day];
}

function displayForecast(response) {
  let forecast= response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<5){
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast col" id="forecast">
      <div class="card" style="width: 9rem">
      <div class="card-body">
        <h5 class="card-title-days">${formatDay(forecastDay.dt)}</h5>
          <p class="card-text">
          
          <img class="icons"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="60"
          />
          </p>
          <p class="daily-temperature">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )} ° - </span>
          
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )} ° </span>
            </p>
          
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
  console.log(coordinates);
  let apiKey = "afe9ee1dd9602aa3cd50d8dcf4b72270";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#todays-temperature");
  let cityElement = document.querySelector("#split");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#dan");
  dateElement.innerHTML = timeNow(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "afe9ee1dd9602aa3cd50d8dcf4b72270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searching(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#input-text");
  search(cityInputElement.value);
}

function showFahrenTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  let fahrenTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenTemp);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "afe9ee1dd9602aa3cd50d8dcf4b72270";
  let apiUrlgeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlgeo).then(displayTemperature);
}
function gerCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", gerCurrentPosition);

let celsiusTemperature = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", searching);

let fahrenLink = document.querySelector("#fahrenButton");
fahrenLink.addEventListener("click", showFahrenTemperature);

let celsiusLink = document.querySelector("#celsiusButton");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("new York");
