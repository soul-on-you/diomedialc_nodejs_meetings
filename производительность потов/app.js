const perf_hooks = require("perf_hooks");
const { Worker } = require("worker_threads");
const { fork } = require("child_process");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(
      items
        .getEntriesByType("measure")
        .map((item) => `${item.name} : ${item.duration}`)
    );
    // observer.disconnect();
  }
);

performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("worker_start");
    const worker = new Worker("./производительность потов/worker.js", {
      workerData: { array },
    });

    worker.on("message", (message) => {
      console.log(`Worker threadID: ${worker.threadId}`);
      performance.mark("worker_end");
      performance.measure("worker", "worker_start", "worker_end");
      resolve(message);
    });

    worker.on("error", (err) => {
      console.error(err.message);
      reject(err);
    });

    worker.on("exit", (returnCode) => {
      console.log(`forkProcess closed with code ${returnCode}`);
    });
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("fork_start");
    const forkProcess = fork("./производительность потов/fork.js");
    forkProcess.send({ array });
    forkProcess.on("message", (message) => {
      console.log(`fork pid: ${forkProcess.pid}`);
      console.log(`Получено сообщение: ${message}`);
      performance.mark("fork_end");
      performance.measure("fork", "fork_start", "fork_end");
      resolve(message);
    });

    forkProcess.on("close", (returnCode) =>
      console.log(`forkProcess closed with code ${returnCode}`)
    );

    forkProcess.on("error", (error) => {
      console.log(`forkProcess error: ${error}`);
      reject(err);
    });

    forkProcess.on("exit", (returnCode) =>
      console.log(
        `forkProcess exit with code ${returnCode} and exit code: ${forkProcess.exitCode}`
      )
    );
  });
};

const main = async () => {
  await workerFunction([25, 20, 30, 50, 50]);
  await forkFunction([25, 20, 30, 50, 50]);
};

main();

/**
 * Worker threadID: 1
 * forkProcess closed with code 0
 * [
 *   PerformanceMeasure {
 *     name: 'worker',
 *     entryType: 'measure',
 *     startTime: 42.84315299987793,
 *     duration: 1717.2620910033584,
 *     detail: null
 *   }
 * ]
 * fork pid: 40297
 * Получено сообщение: 1.5511210043330986e+25,2432902008176640000,2.6525285981219103e+32,3.0414093201713376e+64,3.0414093201713376e+64
 * [
 *   PerformanceMeasure {
 *     name: 'fork',
 *     entryType: 'measure',
 *     startTime: 1807.3112390041351,
 *     duration: 1777.3464839980006,
 *     detail: null
 *   }
 * ]
 * forkProcess exit with code 0 and exit code: 0
 * forkProcess closed with code 0
 */

/**
 * Выводы:
 * -Worker threads используем когда:
 * 1) большие данные для обмена
 * 2) частая комуникация
 * -Fork используем когда:
 * 1) мало комуникации
 * 2) малые данные для обмена
 */

// но лучше везде использовать воркер тред
