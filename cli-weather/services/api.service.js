import axios from "axios";
import { printError, printSuccess } from "./log.service.js";

const locationsURL = "https://api.openweathermap.org/geo/1.0/direct";
//`http://api.openweathermap.org/geo/1.0/direct?q=${city}limit=5&appid=${token}`

const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const langWeatherAnswer = "ru";
const unitsWeatherAnswer = "units";

const apiCallCityWeather = async (lat, lon, token, lang, units) => {
  const response = await axios.get(weatherURL, {
    params: { lat, lon, appid: token, lang, units },
  });

  //   if (response.statusCode === 401) {
  //     throw new Error("Неправильно указан токен");
  //   }

  //   if (response.statusCode === 404) {
  //     throw new Error("Неправильно указан город");
  //   }

  const data = response.data;

  if (!data) {
    throw new Error(
      "Сервер отправил пустой ответ на запрос погоды в данном городе"
    );
  }

  return data;
};

const apiCallCityCoords = async (city, token) => {
  const response = await axios.get(locationsURL, {
    params: { q: city, appid: token },
  });

  const data = response.data;

  if (!data) {
    throw new Error("Сервер отправил пустой ответ на запрос списка локаций");
  }

  return data.map((location) => ({
    location: location.name,
    country: location.country,
    state: location.state,
    lat: location.lat,
    lon: location.lon,
  }));
};

const getWeather = async (city, token) => {
  const locations = await apiCallCityCoords(city, token);

  if (locations.length <= 0) {
    printError(`По данному запросу "${city}" никаких городов не найдено`);
    return null;
  }

  if (locations.length === 1) {
    printSuccess(`Погода в городе "${city}" получена...`);
    const location = locations[0];
    // console.log(location);
    const response = await apiCallCityWeather(
      location.lat,
      location.lon,
      token,
      langWeatherAnswer,
      unitsWeatherAnswer
    );

    return response;
  }

  printSuccess(`По данному запросу "${city}" найдены города:\n`);
  locations.forEach((location) => console.log(location));
};

const getIcon = (icon) => {
  switch (icon?.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
  }
};

export { getWeather, getIcon };
