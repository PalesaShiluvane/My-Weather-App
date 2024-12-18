searchCity("Tzaneen");
function refreshWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-date");
  timeElement.innerHTML = `${formatDate(date)},`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="current-temperature-icon"
    />`;
}

function searchCity(city) {
  let apiKEY = `90837b7722d3o37ab2424dfa2715bt14`;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKEY}&units=metric`;

  axios.get(apiURL).then(refreshWeather);
}

//Handle Search Input Submit button
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

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
