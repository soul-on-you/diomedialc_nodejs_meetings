const { exec, spawn } = require("child_process");

const childSpawnProcess = spawn("ls");

childSpawnProcess.stdout.on("data", (data) => {
  console.log(`Stdout: ${data}`);
});

childSpawnProcess.stderr.on("data", (data) => {
  console.log(`Stderr: ${data}`);
});

childSpawnProcess.on("exit", (returnCode) =>
  console.log(`childSpawnProcess finished with code ${returnCode}`)
);

/**
 * Stdout: Spawn и exec вызовы\
 * worker threads\
 * глобальные переменные\
 * измерение производительности\
 * использование worker thread\
 * принцип рыботы event loop\
 * про модули\
 * события\
 * стек вызова\
 * таймеры и интервалы\
 * childSpawnProcess finished with code 0
 */

const childExecProcess = exec("ls", (error, stdout, stderr) => {
  if (error) console.error(error.message);
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

childExecProcess.on("exit", (returnCode) =>
  console.log(`childExecProcess finished with code ${returnCode}`)
);

/**
 * childExecProcess finished with code 0
 * stdout: Spawn и exec вызовы
 * worker threads
 * глобальные переменные
 * измерение производительности
 * использование worker thread
 * принцип рыботы event loop
 * про модули
 * события
 * стек вызова
 * таймеры и интервалы
 * stderr: 
 */
