import chalk from "chalk";

const printError = (error) => {
  console.error(`${chalk.bgRed(" ERROR ")}: ${error}`);
};

const printSuccess = (msg) => {
  console.error(`${chalk.bgGreen(" SUCCESS ")}: ${msg}`);
};

const printWeather = (res, icon) => {
  console.error(
    `${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.name}\n${icon}  ${
      res.weather[0].description
    }\nТемпература: ${Math.floor(
      res.main.temp - 273
    )} (ощущается как ${Math.floor(
      res.main.feels_like - 273
    )})\nВлажность воздуха: ${res.main.humidity}%\nСкорость ветра: ${
      res.wind.speed
    }`
  );
};

export { printError, printSuccess, printWeather };
