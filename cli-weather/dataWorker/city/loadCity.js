import {
  getKeyValue,
  STORAGE_DICTIONARY,
} from "../../services/storage.service.js";
import { printError } from "../../services/log.service.js";

export default async () => {
  try {
    return await getKeyValue(STORAGE_DICTIONARY.city);
  } catch (e) {
    printError(e.message);
  }
};
