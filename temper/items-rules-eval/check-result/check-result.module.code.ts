import type { ConditionResult } from "akasha/temper/items-rules-eval/rule-condition-eval/rule-condition-eval.module.code.ts"

export type ConditionCheckResult = { readonly kind: "skip" } | ConditionResult
