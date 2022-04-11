import { printSuccess, printError } from "../services/log.service.js";
import { getWeather } from "../services/api.service.js";
import {
  saveKeyValue,
  getKeyValue,
  STORAGE_DICTIONARY,
} from "../services/storage.service.js";
import { Command } from "commander";
const program = new Command();

program
  .name("Easy-weather")
  .description("CLI утилита для получения прогноза погоды в вашем городе")
  .version("1.0.0")
  .option("-c, --city <string>", "watch weather in city")
  .option(
    "-t --token <API_KEY>",
    "If you have your prod API token"
    // "MyToken665"
  )
  .option("-d, --debug", "output extra debugging");
program.parse(process.argv);
// program
//   .command("split")
//   .description("Split a string into substrings and display as an array")
//   .argument("<string>", "string to split")
//   .option("--first", "display just the first substring")
//   .option("-s, --separator <char>", "separator character", ",")
//   .action((str, options) => {
//     // const options = program.opts();
//     console.log(options);
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

const saveToken = async (token) => {
  try {
    await saveKeyValue(STORAGE_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const loadToken = async () => {
  try {
    return await getKeyValue(STORAGE_DICTIONARY.token);
  } catch (e) {
    printError(e.message);
  }
};

const Forcast = async (city, weatherToken) => {
  if (city) {
    try {
      const weatherResponse = await getWeather(city, weatherToken);
      console.log(weatherResponse);
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

const options = program.opts();
if (options.debug) {
  console.log(options);
}
if (options.city) {
  printSuccess(`City : ${options.city}`);
}

if (options.token) {
  await saveToken(options.token);
}

const initCLI = async () => {
  const weatherToken = await loadToken();

  if (!weatherToken) {
    printError("Не задан ключ API задайте его через команду -t [API_KEY]");
    return;
  }

  await Forcast(options.city, weatherToken);
};

initCLI();
