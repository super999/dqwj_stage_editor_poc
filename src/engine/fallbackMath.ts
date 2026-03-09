import type { CalcDemoRequest, CalcDemoResult } from "../types";

function roundTo2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function calcDamageFallback(input: CalcDemoRequest): Omit<CalcDemoResult, "mode"> {
  const flatBonus = input.flatBonus ?? 0;
  const critMultiplier = input.critMultiplier ?? 1.5;
  const elementBonus = input.elementBonus ?? 0;
  const critFactor = input.isCrit ? critMultiplier : 1;

  const rawPreDamage = input.attack * input.skillMultiplier - input.defense * 0.35 + flatBonus;
  const preDamage = roundTo2(Math.max(0, rawPreDamage));
  const finalDamage = roundTo2(preDamage * critFactor * (1 + elementBonus));

  const expression = `max(0, ${input.attack} * ${input.skillMultiplier} - ${input.defense} * 0.35 + ${flatBonus}) * ${critFactor} * (1 + ${elementBonus})`;

  return {
    expression,
    preDamage,
    finalDamage
  };
}
