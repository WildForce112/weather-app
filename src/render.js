let tempMode = "F";

function convertToCelcius(Fahrenheit) {
  return ((Fahrenheit - 32) * 5) / 9;
}

export const Renderer = (() => {
  const container = document.createElement("div");
  const tempSlider = document.querySelector(".switch>input");
  container.id = "hourly-weather-container";

  function createWeatherBlock(arr) {
    const weatherBlock = document.createElement("div");
    weatherBlock.classList.add("weather-block");
    ["time", "icon", "temp"].forEach((item) => {
      const itemDisplay = document.createElement("div");
      itemDisplay.classList.add(item);
      itemDisplay.textContent = arr[item];
      weatherBlock.appendChild(itemDisplay);
    });
    return weatherBlock;
  }

  function renderHourlyWeather(array, checked = tempSlider.checked) {
    container.textContent = "";
    for (const hourly of array) {
      container.appendChild(
        createWeatherBlock({
          time: hourly.datetime.slice(0, 5),
          icon: hourly.icon,
          temp: checked
            ? `${Math.round(convertToCelcius(hourly.temp) * 10) / 10} ℃`
            : `${hourly.temp} ℉`,
        }),
      );
    }
  }

  function init(arr) {
    renderHourlyWeather(arr);
  }

  document.querySelector("main").appendChild(container);

  return { init, renderHourlyWeather };
})();
