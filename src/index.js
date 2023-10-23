import "normalize.css";
import "./style.css";
import { hideLabel } from "./hide-elements";

function component() {
  const locationInput = document.querySelector("input#location");
  const locationLabel = document.querySelector(".location-container label");
  const locationForm = document.querySelector("form#location-form");
  const content = document.querySelector("#content");
  const tempToggleBtn = document.querySelector("button.temp-toggle");
  let temp = "c";
  locationInput.addEventListener(
    "input",
    hideLabel.bind(this, locationLabel, locationInput),
  );

  function createLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    content.appendChild(loader);
  }

  function removeLoader() {
    const loader = document.querySelector(".loader");
    content.removeChild(loader);
  }

  function changeWeatherTemp() {
    temp === "c" ? (temp = "f") : (temp = "c");
  }

  function getDegree() {
    return temp === "c" ? "℃" : "℉";
  }

  function getFeelsTemp() {
    return temp === "c" ? "feelslike_c" : "feelslike_f";
  }

  function getTemp() {
    return temp === "c" ? "temp_c" : "temp_f";
  }

  function changeToggleBtnText() {
    return temp === "c" ? "Change to Celcius" : "Change to Farenheit";
  }

  function updateWeatherDom(data) {
    const city = document.querySelector(".weather-content .city");
    city.textContent = data.location.name;
    const country = document.querySelector(".weather-content .country");
    country.textContent = data.location.country;
    const conditionIcon = document.querySelector(
      ".weather-content .condition img",
    );
    conditionIcon.src = data.current.condition.icon;
    const condition = document.querySelector(
      ".weather-content .condition-text div",
    );
    condition.textContent = data.current.condition.text;
    const temp = document.querySelector(".weather .temp .text");
    temp.textContent = data.current[getTemp()];
    const degree = document.querySelector(".weather .temp .degree");
    degree.textContent = getDegree();
    const feelsTemp = document.querySelector(".weather .feels-like .text");
    feelsTemp.textContent = `${data.current[getFeelsTemp()]}`;
    const feelsDegree = document.querySelector(".weather .feels-like .degree");
    feelsDegree.textContent = getDegree();
  }

  function checkWeatherData(data) {
    if (data.location) {
      console.log(data);
      updateWeatherDom(data);
    } else {
      alert(data.error.message);
    }
    removeLoader();
  }

  async function fetchWeather(location) {
    createLoader();
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=cad9ebba78f945648d2115634231610&q=${location}`,
        { mode: "cors" },
      );
      const data = await response.json();
      checkWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getWeather(input) {
    const location = input.value;
    fetchWeather(location);
  }

  locationForm.addEventListener("submit", getWeather.bind(this, locationInput));

  fetchWeather("berlin");

  function toggleTemp() {
    tempToggleBtn.textContent = changeToggleBtnText();
    changeWeatherTemp();
    fetchWeather(document.querySelector(".weather-content .city").textContent);
  }

  tempToggleBtn.addEventListener("click", toggleTemp);
}

component();
