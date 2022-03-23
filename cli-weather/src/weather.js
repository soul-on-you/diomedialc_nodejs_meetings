// const { program } = require("commander");

// program.option("--first").option("-s, --separator <char>");

// program.parse();

// const options = program.opts();
// console.log(options);
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

import { Command } from "commander";
const program = new Command();

program
  .name("Easy-weather")
  .description("CLI утилита для получения прогноза погоды в вашем городе")
  .version("1.0.0")
  .option("-c, --city <string>", "watch weather in city")
  .option(
    "-t --token <string>",
    "If you have your prod API token",
    "MyToken665"
  )
  .option("-d, --debug", "output extra debugging");

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

// program.parse();

// program
//   .option("-d, --debug", "output extra debugging")
//   .option("-s, --small", "small pizza size")
//   .option("-p, --pizza-type <type>", "flavour of pizza");

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
if (options.city) console.log(`City : ${options.city}`);
// console.log("pizza details:");
// if (options.small) console.log("- small pizza size");
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

const initCLI = () => {
  console.log(process.argv);
  /**
   * [ashling@ashling cli-weather]$ npm start fhefhsjf djhjfhsdjfhskd
   *   > cli-weather@1.0.0 start
   * > node ./src/weather.js "fhefhsjf" "djhjfhsdjfhskd"
   * [
   *     '/usr/bin/node',
   *     '/home/ashling/nodejs_training/cli-weather/src/weather.js',
   *     'fhefhsjf',
   *     'djhjfhsdjfhskd'
   * ]
   */
};

initCLI();

