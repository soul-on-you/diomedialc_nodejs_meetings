const { parentPort, workerData } = require("worker_threads");
const factorial = require("./factorial");

const bigCompute = ({ array }) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) arr.push(i * i);
  return array.map((item) => factorial(item));
};

parentPort.postMessage(bigCompute(workerData));
