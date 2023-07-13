// Time & Date

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Time
function zero(value) {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
}

function time() {
  let hours = zero(now.getHours());
  let minutes = zero(now.getMinutes());

  return hours + ":" + minutes;
}
document.getElementById("time").innerHTML = time();

// Date
function currently_date() {
  let date = now.getDate();
  return date;
}
document.getElementById("number").innerHTML = currently_date();

function currently_day() {
  let day = days[now.getDay()];
  return day;
}
document.getElementById("day").innerHTML = currently_day();

function currently_month() {
  let month = months[now.getMonth()];
  return month;
}
document.getElementById("month").innerHTML = currently_month();

// Show Forecast
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#degrees").innerHTML = temperature;

  // Fahrenheit & Celsius
  function fahren(event) {
    event.preventDefault();
    let fahrenheit = Math.round((9 / 5) * temperature + 32);
    document.getElementById("degrees").innerHTML = fahrenheit;
  }

  function cels(event) {
    event.preventDefault();
    let celsius = Math.round(temperature);
    document.getElementById("degrees").innerHTML = celsius;
  }

  let fahrenheitClik = document.getElementById("fahrenheit");
  fahrenheitClik.addEventListener("click", fahren);

  let celsiusClik = document.getElementById("celsius");
  celsiusClik.addEventListener("click", cels);
}

// Search By City Name
function searchCity(city) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function form(event) {
  event.preventDefault();
  let cityName = document.querySelector("#enter-city").value;
  searchCity(cityName);
}
let formSearching = document.querySelector("#searching");
formSearching.addEventListener("submit", form);

// Search By Geolocation
function searchGeo(position) {
  let apiKey = "0a521eaf234a3a56f45252fac3c737ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchGeo);
}

let currentBtn = document.querySelector("#current-button");
currentBtn.addEventListener("click", getCurrentGeo);

searchCity("Kyiv");
