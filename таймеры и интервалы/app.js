const start = performance.now();
setTimeout(() => {
  console.log(performance.now() - start);
  console.log("Прошла секунда");
}, 1000);
/**
 * 1002.7033289968967
 * Прошла секунда
 */

const sayHello = (name) => {
  console.log(`Hello ${name}!`);
};

setTimeout(sayHello, 1000, "Victor"); // Hello Victor!

const ConnectionTimeoutError = () => {
  clearTimeout(successConnection);
  console.log(`Connection to DB timeout error`);
};

const connectionTimeout = setTimeout(ConnectionTimeoutError, 5000);

const successConnection = setTimeout(() => {
  clearTimeout(connectionTimeout);
  console.log(`Подключение выполнилось`);
}, 6000);

const intervalTest = setInterval(() => {
  console.log(`${performance.now()}`);
}, 1000);

setTimeout(() => {
  clearInterval(intervalTest);
}, 10000);

console.log("Перед");

setImmediate(() => {
  console.log("После всего");
});

console.log("После");
/**
 * Перед
 * После
 * После всего
 */

const timerID = setTimeout(() => {
  console.log("finish");
}, 5000);

timerID.unref();

setImmediate(() => {
  timerID.ref();
});
