import {
  saveKeyValue,
  STORAGE_DICTIONARY,
} from "../../services/storage.service.js";
import { printSuccess, printError } from "../../services/log.service.js";

export default async (token) => {
  try {
    await saveKeyValue(STORAGE_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};
