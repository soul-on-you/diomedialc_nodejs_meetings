const perf_hooks = require("perf_hooks");

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
    const entry = items.getEntriesByName("slow").pop();
    console.log(`${entry.name}: ${entry.duration}`);
    const funcEntry = items.getEntriesByType("function").pop();
    console.log(`${funcEntry.name}: ${funcEntry.duration}`);
    observer.disconnect();
  }
);

performanceObserver.observe({ entryTypes: ["measure", "function"] });
/**[
 *   PerformanceMeasure {
 *     name: 'slow',
 *     entryType: 'measure',
 *     startTime: 37.91012999787927,
 *     duration: 2075.1180240027606,
 *     detail: null
 *   }
 * ]
 * slow: 2075.1180240027606
 */

const slow = () => {
  performance.mark("start_slow");
  const arr = [];
  for (let i = 0; i < 100000000; i++) arr.push(i * 2);
  performance.mark("end_slow");
  performance.measure("slow", "start_slow", "end_slow");
  //   console.log(performance.getEntriesByName("slow"));
  /**
   * [
   *   PerformanceMeasure {
   *     name: 'slow',
   *     entryType: 'measure',
   *     startTime: 36.96092999726534,
   *     duration: 2311.827067002654,
   *     detail: null
   *   }
   * ]
   */

  //   console.log(performance.getEntriesByType());
};

slow();

// console.log(performance.getEntries());

/**
 * network[
 * PerformanceMark {
 *   name: 'start_slow',
 *   entryType: 'mark',
 *   startTime: 38.10523799806833,
 *   duration: 0,
 *   detail: null
 * },
 * PerformanceMeasure {
 *   name: 'slow',
 *   entryType: 'measure',
 *   startTime: 38.10523799806833,
 *   duration: 2732.0292750000954,
 *   detail: null
 * },
 * PerformanceMark {
 *   name: 'end_slow',
 *   entryType: 'mark',
 *   startTime: 2770.1345129981637,
 *   duration: 0,
 *   detail: null
 * }
] */

let slow2 = () => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) arr.push(i * 2);
};

slow2 = perf_hooks.performance.timerify(slow2);

slow2();

/**
 * PerformanceEntry {
 *   name: 'slow2',
 *   entryType: 'function',
 *   startTime: 2863.966506000608,
 *   duration: 1941.3517469987273,
 *   detail: []
 * }
 * slow2: 1941.3517469987273
 */