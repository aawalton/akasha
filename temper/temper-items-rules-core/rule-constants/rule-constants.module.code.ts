export const RULE_CONSTANTS = { MIN_LISTING_VALUE: 5000 } as const
export type RuleConstantKey = keyof typeof RULE_CONSTANTS
export const RULE_CONSTANT_KEYS = [
  "MIN_LISTING_VALUE",
] as const satisfies readonly RuleConstantKey[]
export function resolveThreshold(v: number | RuleConstantKey): number {
  return typeof v === "number" ? v : RULE_CONSTANTS[v]
}
