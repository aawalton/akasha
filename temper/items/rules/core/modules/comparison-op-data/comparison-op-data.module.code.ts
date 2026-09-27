export const COMPARISON_OP_IDS = ["<=", "<", ">=", ">", "=", "!="] as const

export type ComparisonOpId = (typeof COMPARISON_OP_IDS)[number]
