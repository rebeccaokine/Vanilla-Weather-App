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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateTime");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  displayBackgroundImage(response.data.weather[0].description);
}

function search(city) {
  let apiKey = "e6fdbebba6d6f76e9a50f7444eca5b52";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Accra");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
