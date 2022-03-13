function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];

  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${hour}:${minutes}`;
  let dateTime = document.querySelector(".date-time");
  dateTime.innerHTML = `${currentDay} ${currentTime}`;
}

formatDate(new Date());

function citySearch(event) {
  event.preventDefault();
  let cityElement = document.querySelector("li.city");
  let cityInput = document.querySelector("#form1");
  cityElement.innerHTML = cityInput.value;
  let city = cityInput.value;
  let apiKey = "75221b0a2fbd866bd87c7405bd2dd631";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("change", citySearch);

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let windSpeed = Math.round(response.data.wind.speed);
  console.log(windSpeed);
  let humidity = Math.round(response.data.main.humidity);
  console.log(humidity);
  let weatherDescription = response.data.weather[0].main;
  console.log(weatherDescription);
  let degree = document.querySelector(".topinfo");
  degree.innerHTML = `${temperature}°F`;
  let speedOfWind = document.querySelector("#wind");
  speedOfWind.innerHTML = `Wind: ${windSpeed} mph`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity} %`;
  let weatherVisual = document.querySelector(".weatherDescription");
  weatherVisual.innerHTML = `${weatherDescription}`;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let cityName = position.name;
  let cityElement = document.querySelector("li.city");
  cityElement.innerHTML = `${cityName}`;
  let apiKey = "5ab70d197dba690a5ae06fdbdb453115";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&name=${cityName}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector(".locationButton");
button.addEventListener("click", getCurrentPosition);
