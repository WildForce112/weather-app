import { Renderer } from "./render";
import {
  getHourlyWeather,
  getWeatherDataFromJson,
  getWeatherData,
} from "./logic";

export function handleEvents() {
  const form = document.querySelector("form");
  const formBtn = document.querySelector("#location-input+button");

  form.addEventListener("submit", async (e) => {
    const locationInput = e.target.querySelector("input").value;
    e.preventDefault();
    e.target.querySelector("input").value = "";
    const forcastData = getHourlyWeather(await getWeatherData(locationInput));
    Renderer.renderHourlyWeather(forcastData);
  });

  const tempSlider = document.querySelector(".switch>input");

  tempSlider.addEventListener("click", (e) => {
    Renderer.renderHourlyWeather(hourlyWeatherList);
  });
}
