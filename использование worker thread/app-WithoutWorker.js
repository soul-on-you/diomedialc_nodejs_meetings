const factorial = require("./factorial");
const perf_hooks = require("perf_hooks");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntriesByType("function").pop());
    observer.disconnect();
  }
);

performanceObserver.observe({ entryTypes: ["function"] });

const bigCompute = (array) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) arr.push(i * i);
  return array.map((item) => factorial(item));
};

let main = () => {
  const result = [
    bigCompute([25, 20, 30, 50, 50]),
    bigCompute([25, 20, 30, 50, 50]),
    bigCompute([25, 20, 30, 50, 50]),
    bigCompute([25, 20, 30, 50, 50]),
  ];

  console.log(result);
};

main = perf_hooks.performance.timerify(main);

setTimeout(() => {
  console.log("Прошло 2 секунды");
}, 2000);

main();

/**
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
 * Прошло 2 секунды!!!!!(завис таймер в однопотоке)
 * PerformanceEntry {
 *   name: 'main',
 *   entryType: 'function',
 *   startTime: 48.51214899867773,
 *   duration: 10841.352919001132,
 *   detail: []
 * }
 */
