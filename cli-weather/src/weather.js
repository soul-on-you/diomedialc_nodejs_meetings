import { printError, printWeather } from "../services/log.service.js";
import { getWeather, getIcon } from "../services/api.service.js";
import { loadToken, loadCity } from "../dataWorker/index.js";
import { HandleArgs } from "../argsCommander/index.js";

const Forcast = async (city, weatherToken) => {
  if (city) {
    try {
      const weatherResponse = await getWeather(city, weatherToken);
      // console.log(weatherResponse);
      return weatherResponse;
    } catch (err) {
      if (err?.response?.status == 404) {
        printError("Неправильно указан город");
      } else if (err?.response?.status == 401) {
        printError("Неправильно указан токен");
      } else {
        console.log(err);
        printError(err.message);
      }
    }
  }
};

const initCLI = async () => {
  await HandleArgs();
  const token = await loadToken();
  const city = await loadCity();

  if (!token) {
    printError("Не задан ключ API, задайте его через команду -t [API_KEY]");
    return;
  }

  if (!city) {
    printError("Не задан город, задайте его через команду -c [City]");
    return;
  }

  const weather = await Forcast(city, token);
  printWeather(weather, getIcon(weather?.weather[0].icon));
};

initCLI();
