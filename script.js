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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "7a006574ec1d5ccec8f3563f51329c3b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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

getCurrentPosition();
