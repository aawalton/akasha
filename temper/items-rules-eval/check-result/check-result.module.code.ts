import type { ConditionResult } from "akasha/temper/items-rules-eval/rule-condition-eval/rule-condition-eval.module.code.ts"

export type ConditionCheckResult = { readonly kind: "skip" } | ConditionResult

export type Misshapen = Extract<ConditionResult, { readonly kind: "misshapen" }>

export function misshapenList(conditionKind: string, held: unknown): Misshapen | undefined {
  if (Array.isArray(held)) return undefined
  return {
    kind: "misshapen",
    conditionKind,
    held: JSON.stringify(held) ?? String(held),
    why: `${conditionKind} is a list of ids, and this rule states one value that is no list`,
  }
}
