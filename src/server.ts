import { createApp } from "./app";
import { config } from "./config";

const app = createApp();

app.listen(config.port, () => {
  // Keep log format simple for Windows service text logs.
  console.log(
    JSON.stringify({
      level: "info",
      msg: "soonfx-demo-service started",
      port: config.port,
      serviceName: config.serviceName,
      ts: new Date().toISOString()
    })
  );
});
