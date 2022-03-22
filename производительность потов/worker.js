const { parentPort, workerData } = require("worker_threads");
const { bigCompute } = require("./factorial");

parentPort.postMessage(bigCompute(workerData));
