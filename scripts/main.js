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
const apiKey = "8cc349adda44ee5217819693cb6482dc";
let cityName = "";

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
    wind.innerHTML = data.wind.speed + "M/S";
    humidity.innerHTML = data.main.humidity;
  } catch (error) {
    console.log(error);
  }
};

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
