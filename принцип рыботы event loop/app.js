// const { nextTick } = require("process");

//? Фазы:
//? *nextTick, microTaskQueue
//? - таймеры
//? *nextTick, microTaskQueue
//? - pending, callbacks
//? *nextTick, microTaskQueue
//? - idle, prepare
//? *nextTick, microTaskQueue
//? - poll
//? *nextTick, microTaskQueue
//? - check
//? *nextTick, microTaskQueue
//? - close callback
//? *nextTick, microTaskQueue
//?
//? -проверка на окончание

const fs = require("fs");

console.log("Init");

setTimeout(() => {
  console.log(`Timer2(100ms): ${Math.floor(performance.now())}`);
}, 100);
setTimeout(() => {
  console.log(`Timer1(100ms)`);
}, 100);

setImmediate(() => {
  console.log("Immediate");
});

fs.readFile(__filename, () => {
  console.log("file read");
});

setTimeout(() => {
  console.log("Done Small Timer Task Before");
}, 0);

setTimeout(() => {
  for (let i = 0; i < 10000000000; ) i++;
  Promise.resolve().then(() => {
    console.log("Promise inside DBig Timer Task");
  });
  console.log("Done Big Timer Task");
  process.nextTick(() => {
    console.log("nextTick inside DBig Timer Task");
  });
}, 0);

setTimeout(() => {
  console.log("Done Small Timer Task After");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("nextTick");
});

console.log("Final");

/**
 * Init
 * Final
 * nextTick
 * Promise
 * Done Small Timer Task Before
 * Done Big Timer Task
 * nextTick inside DBig Timer Task
 * Promise inside DBig Timer Task
 * Done Small Timer Task After
 * Immediate
 * Timer2(100ms): 14284
 * Timer1(100ms)
 * file read
 * [Done] exited with code=0 in 14.323 seconds
 */

/**
 * что произошло:
 * на вход в v8 идет запрос с нашими командами, Node bindings передает их в Event Queue,
 * Event Loop при инициализации выполняет последовательный код, при проходе консоллог
 * срабатывает и возвращает ответ в консоль, затем начинается фаза с nextTick и 
 * microTaskQueue, срабатывает тик(nextTick), а потом промис(microTaskQueue), затем фаза
 * таймеров, ивент Event Loop получает таймер с временем исполнения 0 и сразу пытается
 * его выполнить, таймеров в коде три и они срабатывают по очереди попадания в Callstack
 * поэтому быстрая задача до большой выполняется моментально. затем выполняется большая
 * задача и после нее маленькая тоже моментально, но из-за большой задачи поток выполнения
 * забился на 14 секунд и мальнекий таск ждал все это время, затем снова фаза nextTick и 
 * microTaskQueue, выводим в консоль запись про тик и потом промис, затем пропускаются
 * фазы (pending, callbacks) и (idle, prepare), фаза poll тоже еще не срабатывает потому
 * что хоть и прошло 14 секунд, но ивент луп начинался на момент 0 секунд и к тому времени
 * файл еще не был считан, и срабатывает фаза check и выводит нам Immediate, далее фаза
 * (close callback) пропускается и делается проверка, в Event Queue еще есть задачи поэтому
 * Event Loop снова начинает работать, никаких (nextTick и microTaskQueue) больше не будет
 * по ходу исполнения, далее идет таймер на 100мс, они выполняются в порядке захода в 
 * Callstack, затем затем пропускаются фазы (pending, callbacks) и (idle, prepare), poll
 * срабатывает т.к. файл уже считан, и Event Loop доходит до конца, ничего нет в Event
 * Queue, новый Event Loop не запускается.
 */