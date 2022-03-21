const { Console } = require("console");
const EventEmitter = require("events"); //запрашиваем ивентэмитер для создания своих событий

const MySQL_DB_Connection = new EventEmitter(); // создаем свой обрыботчик событий

// функция вызываемая после загрузки воображаемой БД
const startBot = () => {
  console.log("starting telegram bot");
};

const retryConnectDB = () => {
  console.log("trying another one time connct to db");
};

const prestartDB = () => {
  console.log("event added last but now first ;)");
};

MySQL_DB_Connection.addListener("connected", startBot); // слушатель для события "connected", отработал бы первым, но мы добавили прелистенер поэтому вторым
MySQL_DB_Connection.addListener("connected", retryConnectDB); // слушатель для события "connected", отработает третьим
MySQL_DB_Connection.prependListener("connected", prestartDB); // слушатель добавится в начало и отработает первым

console.log(MySQL_DB_Connection.listeners("connected"));
/**
 * [
 * [Function: prestartDB],
 * [Function: startBot],
 * [Function: retryConnectDB]
 * ]
 */

MySQL_DB_Connection.emit("connected"); // вызов срабатывания события "connected"
/**
 * event added last but now first ;)
 * starting telegram bot
 * trying another one time connct to db
 */

// перегрузка интерфейса событий частая проблема потери памяти на больше неиспользуемые события
// 1) Удаляет все обработчики на событии "connected", startBot и retryConnectDB
//? MySQL_DB_Connection.removeAllListeners("connected");
// 2) Удаляет один слушатель события
//? MySQL_DB_Connection.removeListener("connected", retryConnectDB);
//? console.log(MySQL_DB_Connection.listeners("connected")); // [ [Function: prestartDB], [Function: startBot] ]
// 3) Выключает слушатель события
MySQL_DB_Connection.off("connected", retryConnectDB);
console.log(MySQL_DB_Connection.listeners("connected")); // [ [Function: prestartDB], [Function: startBot] ]
MySQL_DB_Connection.on("connected", retryConnectDB);
console.log(MySQL_DB_Connection.listeners("connected")); // [ [Function: startBot], [Function: prestartDB], [Function: retryConnectDB] ]

MySQL_DB_Connection.on("update", (timeUpdate) => {
  console.log(`db update at ${timeUpdate}`);
});

MySQL_DB_Connection.once("init", () => {
  console.log("init only once time");
});

MySQL_DB_Connection.emit("init"); // init only once time
MySQL_DB_Connection.emit("init"); // ничего не вывело потому что у меня ивент once

console.log(MySQL_DB_Connection.getMaxListeners()); // 10 - ивентов максимально
MySQL_DB_Connection.setMaxListeners(1);
console.log(MySQL_DB_Connection.getMaxListeners()); // 1 - ивентов максимально

console.log(MySQL_DB_Connection.listenerCount("connected")); // 3 - два ивента на "connected"

// можно написать свой обработчик ошибок
MySQL_DB_Connection.on("error", (error) => {
  console.log(`Ошибка: ${error.message}`);
});

MySQL_DB_Connection.emit("error", new Error("BOOOM!")); // Ошибка: BOOOM!
