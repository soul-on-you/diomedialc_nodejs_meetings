import {
  saveKeyValue,
  STORAGE_DICTIONARY,
} from "../../services/storage.service.js";
import { printSuccess, printError } from "../../services/log.service.js";

export default async (city) => {
  try {
    await saveKeyValue(STORAGE_DICTIONARY.city, city);
    printSuccess("Город сохранен");
  } catch (e) {
    printError(e.message);
  }
};
