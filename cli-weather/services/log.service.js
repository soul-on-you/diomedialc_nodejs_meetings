import chalk from "chalk";

const printError = (error) => {
  console.error(`${chalk.bgRed(" ERROR ")}: ${error}`);
};

const printSuccess = (msg) => {
  console.error(`${chalk.bgGreen(" SUCCESS ")}: ${msg}`);
};

export { printError, printSuccess };
