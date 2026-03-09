import type { CalcDemoRequest } from "./types";

interface ValidationResult {
  ok: boolean;
  errors: string[];
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function validateCalcDemoPayload(payload: unknown): ValidationResult {
  const errors: string[] = [];
  if (!payload || typeof payload !== "object") {
    return { ok: false, errors: ["payload must be a JSON object"] };
  }

  const p = payload as Record<string, unknown>;
  const requiredFields: Array<keyof CalcDemoRequest> = ["attack", "defense", "skillMultiplier"];
  for (const field of requiredFields) {
    if (!isFiniteNumber(p[field])) {
      errors.push(`${field} must be a finite number`);
    }
  }

  const optionalNumberFields: Array<keyof CalcDemoRequest> = ["flatBonus", "critMultiplier", "elementBonus"];
  for (const field of optionalNumberFields) {
    if (p[field] !== undefined && !isFiniteNumber(p[field])) {
      errors.push(`${field} must be a finite number when provided`);
    }
  }

  if (p.isCrit !== undefined && typeof p.isCrit !== "boolean") {
    errors.push("isCrit must be a boolean when provided");
  }

  return { ok: errors.length === 0, errors };
}
