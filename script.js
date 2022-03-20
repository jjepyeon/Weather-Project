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
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let weatherDescription = response.data.weather[0].main;

  fahrenheitTemperature = response.data.main.temp;

  let degree = document.querySelector("#temperature");
  degree.innerHTML = `${temperature}`;
  let speedOfWind = document.querySelector("#wind");
  speedOfWind.innerHTML = `Wind: ${windSpeed} mph`;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `Humidity: ${humidity} %`;
  let weatherVisual = document.querySelector(".weatherDescription");
  weatherVisual.innerHTML = `${weatherDescription}`;
  let iconElement = document.querySelector(".mainweathericon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the fahrenheit link
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
