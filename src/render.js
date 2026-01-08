let tempMode = "F";

function convertToCelcius(Fahrenheit) {
  return ((Fahrenheit - 32) * 5) / 9;
}

export const Renderer = (() => {
  const container = document.createElement("div");
  const tempSlider = document.querySelector(".switch>input");
  container.id = "hourly-weather-container";

  async function getWeatherIcon(icon) {
    try {
      return (await import(`./icons/${icon}.svg`)).default;
    } catch {
      return;
    }
  }

  async function createWeatherBlock(arr) {
    const weatherBlock = document.createElement("div");
    weatherBlock.classList.add("weather-block");
    for (const item of ["time", "icon", "temp"]) {
      let itemDisplay;
      if (item !== "icon") {
        itemDisplay = document.createElement("div");
        itemDisplay.classList.add(item);
        itemDisplay.textContent = arr[item];
      } else {
        itemDisplay = document.createElement("img");
        itemDisplay.classList.add("icon");

        try {
          itemDisplay.src = await getWeatherIcon(arr[item]);
        } catch {
          itemDisplay.alt = "unknown weather";
        }
      }
      weatherBlock.appendChild(itemDisplay);
    }
    return weatherBlock;
  }

  async function renderHourlyWeather(array, checked = tempSlider.checked) {
    container.textContent = "";
    for (const hourly of array) {
      container.appendChild(
        await createWeatherBlock({
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
