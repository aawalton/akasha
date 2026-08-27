import type { ConditionResult } from "../condition-eval"

export type ConditionCheckResult = { readonly kind: "skip" } | ConditionResult
