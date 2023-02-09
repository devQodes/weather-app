let currentDayTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = currentDayTime.getDay();
let formattedDay = days[currentDay];

let currentTime = currentDayTime.toLocaleTimeString();
let formattedTime = currentTime.substring(0, 5);

let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${formattedDay} ${formattedTime}`;

//-----------------------------------------------------------------

function displayCityAndTemp(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let newCity =
    cityInput.value.charAt(0).toUpperCase() + cityInput.value.substring(1);
  let city = document.querySelector(".current.city");
  city.innerHTML = `${newCity}`;

  let units = `metric`;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `1266ad07b66517497b1acf79ea5a6a64`;
  let apiUrl = `${apiEndPoint}q=${newCity}&appid=${apiKey}&units=${units}`;

  function showTemp(response) {
    let cityTempCelsius = Math.round(response.data.main.temp);
    let cityTempFahrenheit = Math.round(cityTempCelsius * 1.8 + 32);
    let temp = document.querySelector(".current.temp");
    temp.innerHTML = `${cityTempCelsius}°C`;

    function displayFahrenheit() {
      let temp = document.querySelector(".current.temp");
      temp.innerHTML = `${cityTempFahrenheit}°F`;
    }

    function displayCelsius() {
      let temp = document.querySelector(".current.temp");
      temp.innerHTML = `${cityTempCelsius}°C`;
    }

    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.addEventListener("click", displayFahrenheit);
    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.addEventListener("click", displayCelsius);
  }
  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", displayCityAndTemp);

//-----------------------------------------------------------------
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);

  let units = `metric`;

  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `1266ad07b66517497b1acf79ea5a6a64`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  function displayCurrentLocationAndTemp(response) {
    let currentTempCelsius = Math.round(response.data.main.temp);
    let currentTempFahrenheit = Math.round(currentTempCelsius * 1.8 + 32);
    let currentLocation = response.data.name;
    let temp = document.querySelector(".current.temp");
    let location = document.querySelector(".current.city");
    temp.innerHTML = `${currentTempCelsius}°C`;
    location.innerHTML = `${currentLocation}`;

    function displayFahrenheit() {
      let temp = document.querySelector(".current.temp");
      temp.innerHTML = `${currentTempFahrenheit}°F`;
    }

    function displayCelsius() {
      let temp = document.querySelector(".current.temp");
      temp.innerHTML = `${currentTempCelsius}°C`;
    }

    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.addEventListener("click", displayFahrenheit);
    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.addEventListener("click", displayCelsius);
  }

  axios.get(apiUrl).then(displayCurrentLocationAndTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);
