import { Command } from "commander";
import { saveToken, saveCity } from "../dataWorker/index.js";
import { printSuccess } from "../services/log.service.js";

export default async function () {
  const program = new Command();

  program
    .name("Easy-weather")
    .description("CLI утилита для получения прогноза погоды в вашем городе")
    .version("1.0.0")
    .option("-c, --city <string>", "watch weather in city")
    .option(
      "-t --token <API_KEY>",
      "If you have your prod API token"
      // "MyToken665" // deafult value
    )
    .option("-d, --debug", "output extra debugging");
  program.parse(process.argv);

  const options = program.opts();
  if (options.debug) {
    console.log(options);
  }

  if (options.city) {
    printSuccess(`City : ${options.city}`);
    await saveCity(options.city);
  }

  if (options.token) {
    await saveToken(options.token);
  }
}

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
