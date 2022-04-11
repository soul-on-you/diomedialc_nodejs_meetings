// import { homedir } from "os";
// import {
//   join,
//   basename,
//   dirname,
//   extname,
//   relative,
//   isAbsolute,
//   resolve,
// } from "path";

// const filePath = "/.diomedialc/weather-cli/weather-data.json";

// const saveKeyValue = (key, value) => {
//   console.log(join(homedir(), filePath));
//   console.log(dirname(filePath));
//   console.log(basename(filePath));
//   console.log(extname(filePath));
//   console.log(relative(filePath, dirname(filePath)));
//   console.log(isAbsolute(filePath));
//   console.log(resolve("../service"));
// };

import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const STORAGE_DICTIONARY = {
  token: "token",
  city: "city",
};

const pathLevel1 = "/.diomedialc";
const pathLevel2 = "/weather-cli";
const pathLevel3 = "weather-data.json";

const path = join(homedir(), pathLevel1, pathLevel2, pathLevel3);

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(path)) {
    const fileData = await promises.readFile(path);
    data = JSON.parse(fileData);
  } else {
    if (!(await isExist(join(homedir(), pathLevel1)))) {
      await promises.mkdir(join(homedir(), pathLevel1));
    }

    if (!(await isExist(join(homedir(), pathLevel1, pathLevel2)))) {
      await promises.mkdir(join(homedir(), pathLevel1, pathLevel2));
    }
  }

  data[key] = value;
  console.log(path, JSON.stringify(data));
  await promises.writeFile(path, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(path)) {
    const fileData = await promises.readFile(path);
    const data = JSON.parse(fileData);
    return data[key];
  }
  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (err) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, STORAGE_DICTIONARY };
