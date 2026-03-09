import type { CalcDemoRequest } from "../src/types";

export interface GoldenCase {
  id: string;
  input: CalcDemoRequest;
  expectedFinalDamage: number;
}

export const goldenCases: GoldenCase[] = [
  { id: "case-01", input: { attack: 100, defense: 0, skillMultiplier: 1 }, expectedFinalDamage: 100 },
  { id: "case-02", input: { attack: 100, defense: 0, skillMultiplier: 1.2 }, expectedFinalDamage: 120 },
  { id: "case-03", input: { attack: 80, defense: 0, skillMultiplier: 2 }, expectedFinalDamage: 160 },
  { id: "case-04", input: { attack: 200, defense: 0, skillMultiplier: 0.5, flatBonus: 10 }, expectedFinalDamage: 110 },
  { id: "case-05", input: { attack: 150, defense: 100, skillMultiplier: 1 }, expectedFinalDamage: 115 },
  { id: "case-06", input: { attack: 150, defense: 100, skillMultiplier: 1, flatBonus: 5 }, expectedFinalDamage: 120 },
  { id: "case-07", input: { attack: 150, defense: 100, skillMultiplier: 1, isCrit: true, critMultiplier: 1.5 }, expectedFinalDamage: 172.5 },
  { id: "case-08", input: { attack: 150, defense: 100, skillMultiplier: 1, isCrit: true, critMultiplier: 1.5, elementBonus: 0.2 }, expectedFinalDamage: 207 },
  { id: "case-09", input: { attack: 300, defense: 250, skillMultiplier: 1.8, flatBonus: 20, elementBonus: 0.1 }, expectedFinalDamage: 519.75 },
  { id: "case-10", input: { attack: 50, defense: 300, skillMultiplier: 1 }, expectedFinalDamage: 0 },
  { id: "case-11", input: { attack: 75, defense: 40, skillMultiplier: 1.33, flatBonus: 2 }, expectedFinalDamage: 87.75 },
  { id: "case-12", input: { attack: 75, defense: 40, skillMultiplier: 1.33, flatBonus: 2, isCrit: true, critMultiplier: 2 }, expectedFinalDamage: 175.5 },
  { id: "case-13", input: { attack: 999, defense: 1, skillMultiplier: 3 }, expectedFinalDamage: 2996.65 },
  { id: "case-14", input: { attack: 999, defense: 1, skillMultiplier: 3, isCrit: true, critMultiplier: 1.25, elementBonus: 0.15 }, expectedFinalDamage: 4307.68 },
  { id: "case-15", input: { attack: 123, defense: 45, skillMultiplier: 0.77, flatBonus: 9, elementBonus: 0.05 }, expectedFinalDamage: 92.36 },
  { id: "case-16", input: { attack: 450, defense: 500, skillMultiplier: 2.4, flatBonus: 30, isCrit: true, critMultiplier: 1.8, elementBonus: 0.25 }, expectedFinalDamage: 2103.75 },
  { id: "case-17", input: { attack: 10, defense: 1, skillMultiplier: 1 }, expectedFinalDamage: 9.65 },
  { id: "case-18", input: { attack: 10, defense: 1, skillMultiplier: 1, isCrit: true, critMultiplier: 2, elementBonus: 0.5 }, expectedFinalDamage: 28.95 },
  { id: "case-19", input: { attack: 0, defense: 0, skillMultiplier: 5, flatBonus: 100 }, expectedFinalDamage: 100 },
  { id: "case-20", input: { attack: 320, defense: 180, skillMultiplier: 1.1, flatBonus: -10, isCrit: true, critMultiplier: 1.6, elementBonus: -0.1 }, expectedFinalDamage: 401.76 }
];
