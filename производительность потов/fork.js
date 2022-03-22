const { bigCompute } = require("./factorial");

process.on("message", (msg) => {
//   console.log(`fork receive message: ${msg}`);
  process.send(bigCompute(msg));
  process.disconnect();
});
