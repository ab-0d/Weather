// Select elements
let temp = document.querySelector(".temperature .temp .deg");
let minTemp = document.querySelector(".temperature .min-temp .deg");
let maxTemp = document.querySelector(".temperature .max-temp .deg");
let wind = document.querySelector(".climate .wind span");
let humidity = document.querySelector(".climate .humidity span");
let city = document.querySelector(".time-location .city");
let time = document.querySelector(".time-location .time span");
let day = document.querySelector(".time-location .day");
let searchInput = document.querySelector(".search-bar input");
let searchIcon = document.querySelector(".searchbar-icon");
let tepmIcon = document.querySelector(".temp i");
const apiKey = OPENWEATHERMAP_API_KEY;
let cityName = "";
// Function to fetch weather data from OpenWeatherMap API
const fetchData = async (cityName) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network");
    }
    const data = await response.json();
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
    minTemp.innerHTML = Math.floor(data.main.temp_min - 273.15) + "°C";
    maxTemp.innerHTML = Math.ceil(data.main.temp_max - 273.15) + "°C";
    wind.innerHTML = data.wind.speed + "km/h";
    humidity.innerHTML = data.main.humidity;
    changeIcon(data);
  } catch (error) {
    console.log(error);
  }
};
// Function to change the weather icon
function changeIcon(data) {
  let arr = tepmIcon.className.split(" ");
  // Remove existing icon classes
  tepmIcon.classList.remove(arr[0]);
  tepmIcon.classList.remove(arr[1]);
  // Add new icon classes based on weather condition
  if (data.weather[0].main == "Clouds") {
    tepmIcon.classList.add("fa-solid");
    tepmIcon.classList.add("fa-cloud");
    tepmIcon.style.color = "white";
  } else if (data.weather[0].main == "Clear") {
    tepmIcon.classList.add("fas");
    tepmIcon.classList.add("fa-sun");
    tepmIcon.style.color = "#ffb200";
  } else if (data.weather[0].main == "Rain") {
    tepmIcon.classList.add("fas");
    tepmIcon.classList.add("fa-cloud-showers-heavy");
    tepmIcon.style.color = "white";
  } else if (data.weather[0].main == "Drizzle") {
    tepmIcon.classList.add("fas");
    tepmIcon.classList.add("fa-cloud-rain");
    tepmIcon.style.color = "white";
  }
}
// Set current day and time in the DOM
let data = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

day.innerHTML = daysOfWeek[data.getDay()];

time.innerHTML = data.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
// Event listeners for search functionality
searchInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    cityName = searchInput.value;
    fetchData(cityName);
  }
});
searchIcon.addEventListener("click", () => {
  cityName = searchInput.value;
  fetchData(cityName);
});
