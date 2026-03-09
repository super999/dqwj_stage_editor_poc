import express, { type Request, type Response } from "express";
import { calcDamage } from "./engine/soonfxAdapter";
import { validateCalcDemoPayload } from "./validation";

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      uptimeSec: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    });
  });

  app.post("/calc-demo", (req: Request, res: Response) => {
    const validation = validateCalcDemoPayload(req.body);
    if (!validation.ok) {
      res.status(400).json({
        error: "invalid_payload",
        details: validation.errors
      });
      return;
    }

    const result = calcDamage(req.body);
    res.status(200).json({
      result
    });
  });

  return app;
}
