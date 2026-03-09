import type { CalcDemoRequest, CalcDemoResult } from "../types";
import { calcDamageFallback } from "./fallbackMath";

type SoonFxModule = Record<string, unknown>;

function tryEvaluateWithSoonFx(expression: string): number | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod: SoonFxModule = require("@soonfx/engine");
    const fx = (mod.fx ?? mod.default ?? mod) as Record<string, unknown>;
    const evaluateExpression = fx.evaluateExpression;
    if (typeof evaluateExpression === "function") {
      const result = (evaluateExpression as (expr: string) => unknown)(expression);
      if (typeof result === "number" && Number.isFinite(result)) {
        return result;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function roundTo2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function calcDamage(input: CalcDemoRequest): CalcDemoResult {
  const fallback = calcDamageFallback(input);
  const soonfxFinal = tryEvaluateWithSoonFx(fallback.expression);

  if (soonfxFinal === null) {
    return {
      mode: "fallback",
      ...fallback
    };
  }

  return {
    mode: "soonfx",
    expression: fallback.expression,
    preDamage: fallback.preDamage,
    finalDamage: roundTo2(Math.max(0, soonfxFinal))
  };
}
