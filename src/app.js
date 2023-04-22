function displayBackgroundImage(description) {
  let mainElement = document.querySelector(".wrapper");
  let backgroundImageUrl;

  if (description.includes("clouds")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/166/original/anime-cloudy.gif?1681529016";
  } else if (description.includes("rain")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/162/original/rain.gif?1681525568";
  } else if (description.includes("snow")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/164/original/snow.gif?1681528596";
  } else if (description.includes("thunderstorms")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/217/original/thunderstorm.gif?1681566408";
  } else if (description.includes("mist")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/167/original/mist.gif?1681529572";
  } else if (description.includes("clear sky")) {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/163/original/Sunny.gif?1681528389";
  } else {
    backgroundImageUrl =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/077/163/original/Sunny.gif?1681528389";
  }

  mainElement.style.backgroundImage = `url('${backgroundImageUrl}')`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
              <div class="col-2" >
                <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png"
                  alt="weather icon"
                  width="50px"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                  <span class="weather-forecast-temp-min">${Math.round(forecastDay.temperature.minimum)}° </span>
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
  let apiKey = "4cb1b0o198a509a8f2a2tffe1e88bf73";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  displayBackgroundImage(response.data.condition.description);
  
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "4cb1b0o198a509a8f2a2tffe1e88bf73";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //changing status of the active link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //changing the status of the active link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Accra");

