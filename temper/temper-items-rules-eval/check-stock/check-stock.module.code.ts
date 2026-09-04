import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext, LookupResult } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkStock(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionCheckResult {
  if (rule.allStocked === undefined && rule.targetQuantity === undefined) {
    return { kind: "skip" }
  }
  if (ctx.skipStock === true) {
    return { kind: "skip" }
  }

  const group = resolveStockGroup(rule, facts, ctx)

  if (rule.allStocked !== undefined) {
    const threshold = rule.stockThreshold ?? 200
    const wanters = collectGroupWanters(group, ctx)
    if (wanters === "unknown") {
      return { kind: "indeterminate", conditionKind: "allStocked", missingSignal: "wanters" }
    }

    let allStocked = true
    for (const charId of wanters) {
      let total = 0
      for (const itemId of group) {
        const stock = ctx.env.getConsumableStock(itemId, charId)
        if (stock === "unknown") {
          return {
            kind: "indeterminate",
            conditionKind: "allStocked",
            missingSignal: `stock:${charId}`,
          }
        }
        total += stock
      }
      if (total < threshold) {
        allStocked = false
        break
      }
    }

    if (rule.allStocked === "all-stocked" && !allStocked) {
      return { kind: "fail", conditionKind: "allStocked" }
    }
    if (rule.allStocked === "not-all-stocked" && allStocked) {
      return { kind: "fail", conditionKind: "allStocked" }
    }
  }

  if (rule.targetQuantity !== undefined) {
    let bank = 0
    for (const itemId of group) {
      const b = ctx.env.getBankStock(itemId)
      if (b === "unknown") {
        return { kind: "indeterminate", conditionKind: "targetQuantity", missingSignal: "bank" }
      }
      bank += b
    }
    if (bank >= rule.targetQuantity) {
      return { kind: "fail", conditionKind: "targetQuantity" }
    }
  }

  return { kind: "pass" }
}

function resolveStockGroup(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ReadonlySet<number> {
  if (rule.id !== undefined && ctx.stockGroupByRuleId !== undefined) {
    const g = ctx.stockGroupByRuleId.get(rule.id)
    if (g !== undefined && g.size > 0) return g
  }
  return new Set<number>([facts.itemId])
}

function collectGroupWanters(
  group: ReadonlySet<number>,
  ctx: EvalContext
): LookupResult<ReadonlyArray<string>> {
  const seen = new Set<string>()
  const out: string[] = []
  for (const itemId of group) {
    const wanters = ctx.env.getConsumableWanters(itemId)
    if (wanters === "unknown") return "unknown"
    for (const charId of wanters) {
      if (!seen.has(charId)) {
        seen.add(charId)
        out.push(charId)
      }
    }
  }
  return out
}
