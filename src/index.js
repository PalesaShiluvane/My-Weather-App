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

  getForecast(response.data.city);
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
function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>
          <div>
          <img src="${day.condition.icon_url}" class="forecast-icon"/> 
           </div>
          <div class="forecast-temperatures">
             <div class="forecast-temp">
              <strong> ${Math.round(day.temperature.maximum)}</strong>
             </div>
             <div class="forecast-temp"> ${Math.round(
               day.temperature.minimum
             )}</div>
          </div>
          </div>`;
    }
  });
}

let forcastElement = document.querySelector("#forecast");
forcastElement.innerHTML = forecastHTML;
displayForecast();

function getForecast(city) {
  let apiKEY = `90837b7722d3o37ab2424dfa2715bt14`;
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query={city}&key={apiKEY}&units=metric`;
  axios(apiURL).then(displayForecast);
  console.log(apiURL);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
