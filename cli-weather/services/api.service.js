import axios from "axios";
// import https from "https";
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
  //? const url = new URL(`https://api.openweathermap.org/geo/1.0/direct`);
  //? url.searchParams.append("q", city);
  //? url.searchParams.append("appid", token);

  //? let locations = "";
  //? https.get(url, (response) => {
  //?   response.on("data", (chunk) => {
  //?     locations += chunk;
  //?   });

  //?   response.on("end", () => console.log(locations));

  //?   response.on("error", (err) => printError(err.message));
  //? });

  const locations = await apiCallCityCoords(city, token);

  if (locations.length <= 0) {
    printError(`По данному запросу "${city}" никаких городов не найдено`);
    return null;
  }

  if (locations.length === 1) {
    printSuccess(`Погода в городе "${city}" получена...`);
    const location = locations[0];
    console.log(location);
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

export { getWeather };

// const response = await axios.post(
//     "https://api.tinkoff.ru/trading/currency/list",
//     {
//       pageSize: 50,
//       currentPage: 0,
//       start: 0,
//       end: 50,
//       sortType: "ByBuyBackDate",
//       orderType: "Asc",
//       country: "All",
//     }
//   );

//   const data = response.data;

//   if (!data) {
//     throw new Error("Сервер отправил пустой ответ на запрос списка валют");
//   }

//   const payload = data.payload;

//   if (!payload) {
//     throw new Error("Сервер не отправил данные на запрос списка валют");
//   }

//   if (data.status !== "Ok") {
//     throw new Error(payload.message);
//   }

//   const values = payload.values;

//   if (!Array.isArray(values)) {
//     throw new Error("Сервер не отправил список валют");
//   }
