import { describe, expect, it } from "vitest";
import { validateCalcDemoPayload } from "../src/validation";

describe("validateCalcDemoPayload", () => {
  it("accepts valid payload", () => {
    const result = validateCalcDemoPayload({
      attack: 100,
      defense: 30,
      skillMultiplier: 1.4,
      isCrit: false
    });
    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects invalid payload", () => {
    const result = validateCalcDemoPayload({
      attack: "100",
      defense: null,
      skillMultiplier: "1.2",
      isCrit: "yes"
    });
    expect(result.ok).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
