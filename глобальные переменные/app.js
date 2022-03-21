console.log(__dirname); // /home/ashling/nodejs_training/глобальные переменные
console.log(__filename); // /home/ashling/nodejs_training/глобальные переменные/tempCodeRunnerFile.js
console.log(global);
/*
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 48.281544998288155,
      nodeStart: 0.3428120017051697,
      v8Start: 1.6833630055189133,
      bootstrapComplete: 38.374445006251335,
      environment: 20.739454999566078,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1647717053101.729
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  structuredClone: [Function: structuredClone]
}
 */

console.log(performance);
/*
Performance {
  nodeTiming: PerformanceNodeTiming {
    name: 'node',
    entryType: 'node',
    startTime: 0,
    duration: 45.56948199868202,
    nodeStart: 0.3560830056667328,
    v8Start: 1.6631969958543777,
    bootstrapComplete: 38.04223099350929,
    environment: 20.117421001195908,
    loopStart: -1,
    loopExit: -1,
    idleTime: 0
  },
  timeOrigin: 1647717125971.884
}
 */

console.log(module);
/*
Module {
  id: '.',
  path: '/home/ashling/nodejs_training/глобальные переменные',
  exports: {},
  filename: '/home/ashling/nodejs_training/глобальные переменные/tempCodeRunnerFile.js',
  loaded: false,
  children: [],
  paths: [
    '/home/ashling/nodejs_training/глобальные переменные/node_modules',
    '/home/ashling/nodejs_training/node_modules',
    '/home/ashling/node_modules',
    '/home/node_modules',
    '/node_modules'
  ]
}
 */

console.log(require);
/*
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: '/home/ashling/nodejs_training/глобальные переменные',
    exports: {},
    filename: '/home/ashling/nodejs_training/глобальные переменные/tempCodeRunnerFile.js',
    loaded: false,
    children: [],
    paths: [
      '/home/ashling/nodejs_training/глобальные переменные/node_modules',
      '/home/ashling/nodejs_training/node_modules',
      '/home/ashling/node_modules',
      '/home/node_modules',
      '/node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {
    '/home/ashling/nodejs_training/глобальные переменные/tempCodeRunnerFile.js': Module {
      id: '.',
      path: '/home/ashling/nodejs_training/глобальные переменные',
      exports: {},
      filename: '/home/ashling/nodejs_training/глобальные переменные/tempCodeRunnerFile.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
 */
