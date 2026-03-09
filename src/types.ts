export interface CalcDemoRequest {
  attack: number;
  defense: number;
  skillMultiplier: number;
  flatBonus?: number;
  isCrit?: boolean;
  critMultiplier?: number;
  elementBonus?: number;
}

export interface CalcDemoResult {
  mode: "soonfx" | "fallback";
  expression: string;
  preDamage: number;
  finalDamage: number;
}
