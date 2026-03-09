import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { AddressInfo } from "node:net";
import { createServer, type Server } from "node:http";
import { createApp } from "../src/app";

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  const app = createApp();
  server = createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve());
  });
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

describe("API", () => {
  it("GET /health returns 200", async () => {
    const res = await fetch(`${baseUrl}/health`);
    expect(res.status).toBe(200);
    const json = (await res.json()) as { status: string };
    expect(json.status).toBe("ok");
  });

  it("POST /calc-demo returns deterministic result", async () => {
    const res = await fetch(`${baseUrl}/calc-demo`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        attack: 100,
        defense: 20,
        skillMultiplier: 1.5,
        isCrit: true,
        critMultiplier: 2
      })
    });
    expect(res.status).toBe(200);
    const json = (await res.json()) as { result: { finalDamage: number } };
    expect(json.result.finalDamage).toBe(286);
  });

  it("POST /calc-demo returns 400 for invalid payload", async () => {
    const res = await fetch(`${baseUrl}/calc-demo`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        attack: "bad-input",
        defense: 20,
        skillMultiplier: 1.5
      })
    });
    expect(res.status).toBe(400);
  });
});
