import { format } from "date-fns";

const apiKey = "63JRNLFFQTB7UJA8SD29B2F7P";

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hochiminh,vn?key=${apiKey}`;

async function getWeatherDataFromJson() {
  const jsonPath = "/weather.json";
  try {
    const res = await fetch(jsonPath);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getWeatherData(url) {
  try {
    const data = await fetch(url);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getHourlyWeather() {
  let hourlyWeather = [];
  for (let i = 0; i <= 25; i++) {
    const now = new Date();
    const rounded = now.getMinutes() < 30 ? 0 : 1;
    const nearestHour = new Date(now.setHours(now.getHours() + i + rounded));
    nearestHour.setMinutes(0, 0, 0);
    const thisDayData = data.days.find(
      (day) => day.datetime == format(nearestHour, "yyyy-MM-dd"),
    );
    const hourlyData = thisDayData.hours.find(
      (hour) => hour.datetime == format(nearestHour, "hh:mm:ss"),
    );
    hourlyWeather.push(hourlyData);
  }
  return hourlyWeather;
}

const data = await getWeatherDataFromJson();
const forcastData = getHourlyWeather();
console.log(forcastData);
