import { format } from "date-fns";

function getURL(location) {
  const apiKey = "63JRNLFFQTB7UJA8SD29B2F7P";
  return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
}

async function getWeatherData(location) {
  const url = getURL(location);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getHourlyWeather(data) {
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
      (hour) => hour.datetime == format(nearestHour, "HH:mm:ss"),
    );
    hourlyWeather.push(hourlyData);
  }
  return hourlyWeather;
}

export { getWeatherData, getHourlyWeather };
