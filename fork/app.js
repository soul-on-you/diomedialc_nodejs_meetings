const { fork } = require("child_process");

const forkProcess = fork("./fork/fork.js");

forkProcess.on("message", (message) => {
  console.log(`получено сообщение: ${message}`);
});

forkProcess.on("close", (returnCode) =>
  console.log(`forkProcess finished with code ${returnCode}`)
);

forkProcess.send("Ping");
forkProcess.send("disconnect");

/**
 * Клиент получил: Ping
 * получено сообщение: Pong
 * forkProcess finished with code 0
 */
