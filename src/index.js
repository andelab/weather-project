function timeNow(timestamp){
  let date =new Date(timestamp);
  let hours= date.getHours();
  if(hours<10){
    hours=`0 ${hours}`
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes= ` 0${minutes}`;
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
  let day= days[date.getDay()];

return ` ${day} ${hours}:${minutes}`
}


function displayTemperature(response){
  console.log(response.data);
  let temperatureElement=document.querySelector("#todays-temperature");
  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  let cityElement=document.querySelector("#split");
  cityElement.innerHTML=response.data.name
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML=response.data.weather[0].description;
  let humidityElement=document.querySelector("#humidity")
  humidityElement.innerHTML=response.data.main.humidity
  let windElement=document.querySelector("#wind");
  windElement.innerHTML=Math.round(response.data.wind.speed)
  let dateElement= document.querySelector("#dan");
  dateElement.innerHTML= timeNow(response.data.dt * 1000)
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
let apiKey = "afe9ee1dd9602aa3cd50d8dcf4b72270";
let city= `Paris`
let apiUrl = 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);