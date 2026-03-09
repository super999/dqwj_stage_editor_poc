import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function toNumber(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export const config = {
  port: toNumber(process.env.PORT, 3000),
  serviceName: process.env.SERVICE_NAME || "SoonFxDemoService",
  logLevel: process.env.LOG_LEVEL || "info"
};
