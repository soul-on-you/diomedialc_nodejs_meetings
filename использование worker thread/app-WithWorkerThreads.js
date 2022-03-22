const factorial = require("./factorial");
const perf_hooks = require("perf_hooks");
const { parentPort, workerData, Worker } = require("worker_threads");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntriesByType("function").pop());
    observer.disconnect();
  }
);

performanceObserver.observe({ entryTypes: ["function"] });

const bigCompute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./использование worker thread/worker.js", {
      workerData: { array },
    });

    worker.on("message", (msg) => {
      console.log(`Worker threadID: ${worker.threadId}`);
      resolve(msg);
    });

    worker.on("error", (error) => {
      reject(error);
    });

    worker.on("exit", () => {
      console.log("worker exited");
    });
  });
};

let main = async () => {
  try {
    const result = await Promise.all([
      bigCompute([25, 20, 30, 50, 50]),
      bigCompute([25, 20, 30, 50, 50]),
      bigCompute([25, 20, 30, 50, 50]),
      bigCompute([25, 20, 30, 50, 50]),
    ]);

    console.log(result);
  } catch (e) {
    console.error(e.message);
  }
};

main = perf_hooks.performance.timerify(main);

setTimeout(() => {
  console.log("Прошло 2 секунды");
}, 2000);

main();

/**
 * Прошло 2 секунды!!!!!
 * Worker threadID: 2
 * Worker threadID: 4
 * worker exited
 * worker exited
 * Worker threadID: 1
 * Worker threadID: 3
 * [
 *   [
 *     1.5511210043330986e+25,
 *     2432902008176640000,
 *     2.6525285981219103e+32,
 *     3.0414093201713376e+64,
 *     3.0414093201713376e+64
 *   ],
 *   [
 *     1.5511210043330986e+25,
 *     2432902008176640000,
 *     2.6525285981219103e+32,
 *     3.0414093201713376e+64,
 *     3.0414093201713376e+64
 *   ],
 *   [
 *     1.5511210043330986e+25,
 *     2432902008176640000,
 *     2.6525285981219103e+32,
 *     3.0414093201713376e+64,
 *     3.0414093201713376e+64
 *   ],
 *   [
 *     1.5511210043330986e+25,
 *     2432902008176640000,
 *     2.6525285981219103e+32,
 *     3.0414093201713376e+64,
 *     3.0414093201713376e+64
 *   ]
 * ]
 * worker exited
 * PerformanceEntry {
 *   name: 'main',
 *   entryType: 'function',
 *   startTime: 41.3570859991014,
 *   duration: 2588.698858998716,
 *   detail: []
 * }
 * worker exited
 */
