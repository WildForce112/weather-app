export const Renderer = (() => {
  const container = document.createElement("div");
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

  function renderHourlyWeather(array) {
    for (const hourly of array) {
      container.appendChild(
        createWeatherBlock({
          time: hourly.datetime.slice(0, 5),
          icon: hourly.icon,
          temp: hourly.temp,
        }),
      );
      console.log(hourly);
    }
  }

  document.querySelector("main").appendChild(container);

  return { renderHourlyWeather };
})();
