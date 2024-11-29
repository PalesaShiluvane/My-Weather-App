let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displaySearchInput);

//API
let apiKEY = `90837b7722d3o37ab2424dfa2715bt14`;

function showCityDegree(response) {
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(response.data.temperature.current);
}

//Display Search Input
function displaySearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;

  let city = searchInput.value;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKEY}&units=metric`;
  axios.get(apiURL).then(showCityDegree);
}

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
