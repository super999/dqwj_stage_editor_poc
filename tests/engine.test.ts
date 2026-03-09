import { describe, expect, it } from "vitest";
import { calcDamage } from "../src/engine/soonfxAdapter";
import { goldenCases } from "./golden-cases";

describe("calcDamage golden regression", () => {
  it("matches all 20 golden cases", () => {
    for (const testCase of goldenCases) {
      const result = calcDamage(testCase.input);
      expect(result.finalDamage, testCase.id).toBe(testCase.expectedFinalDamage);
    }
  });
});
