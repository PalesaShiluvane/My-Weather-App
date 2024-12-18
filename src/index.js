function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
}

//API

function searchCity(city) {
  let apiKEY = `90837b7722d3o37ab2424dfa2715bt14`;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKEY}&units=metric`;

  axios.get(apiURL).then(refreshWeather);
}

//Display Search Input as City
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//Current Date
function formatDate(date) {
  let day = date.getDay();
  let hour = date.getHours();
  let min = date.getMinutes();

  if (min < 10) {
    min = `0${min}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = weekDay[day];
  return `${dayName} ${hour}:${min}`;
}

let currentDateSentence = document.querySelector("#current-date");
let currentDate = new Date();

currentDateSentence.innerHTML = formatDate(currentDate);
