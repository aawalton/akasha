import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { readFirstAccountWide } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items-rules-core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/modules/eval-env/eval-env.module.code.ts"
import {
  evaluateRule,
  matchRules,
} from "akasha/temper/items-rules-eval/modules/evaluator/evaluator.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { z } from "zod"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const OUTBOX_KEY = "pendingSettingsMutations"

const ABSENT = "-"

const ORDERED_RULE = "ordered-rule"

const ITEM_RULE = "item-rule"

const VERDICT_OUTBOX = "item-verdict-outbox"

const LOCKED_UNLOCK = "locked-unlock"

const NO_MATCH = "no-match"

const NOTHING = "nothing"

const UNLOCK = "unlock"

const LOCKED = "locked"

const STOCK = "stock"

const BY_PRIORITY = "character:by-priority"

const STOCK_SURPLUS_SINK = "bank"

const ACTION = "action"

const DESTINATION = "destination"

const RULE = "rule"

export interface Verdict {
  readonly action: string
  readonly destination: string | null
  readonly by: string | null
  readonly ruleIndex: number | null
}

const NO_MATCH_VERDICT: Verdict = {
  action: NOTHING,
  destination: null,
  by: NO_MATCH,
  ruleIndex: null,
}

export interface FreshInputs {
  readonly orderedRules: ReadonlyArray<CompiledOrderedRule>
  readonly itemRuleById: ReadonlyMap<number, ItemRule>
  readonly queuedById: ReadonlyMap<number, string>
  readonly ctx: EvalContext
}

export function verdictRecordedOn(item: InventoryItemData): Verdict | undefined {
  if (item.resolvedAction === undefined) return undefined
  return {
    action: item.resolvedAction,
    destination: item.resolvedDestination ?? null,
    by: item.resolvedBy ?? null,
    ruleIndex: item.resolvedRuleIndex ?? null,
  }
}

export function itemRuleDestination(rule: ItemRule): string | null {
  if (rule.action !== STOCK) return rule.destination ?? null
  const chain = rule.destinationChain
  if (chain !== undefined && chain.length > 0) {
    return planStockChainVisit(chain)?.surplusDestination ?? rule.destination ?? null
  }
  if (rule.destination === BY_PRIORITY) return STOCK_SURPLUS_SINK
  return rule.destination ?? null
}

function unlockedByOrderedRule(facts: ItemFacts, inputs: FreshInputs): Verdict | undefined {
  for (let index = 0; index < inputs.orderedRules.length; index++) {
    const rule = inputs.orderedRules[index]
    if (rule === undefined) continue
    if (rule.locked !== LOCKED || rule.action !== UNLOCK) continue
    const result = evaluateRule(rule, index, facts, inputs.ctx)
    if (result.verdict.kind !== "matched") continue
    return {
      action: UNLOCK,
      destination: result.resolvedDestination ?? rule.destination ?? null,
      by: ORDERED_RULE,
      ruleIndex: index,
    }
  }
  return undefined
}

export function freshVerdictFor(
  item: InventoryItemData,
  facts: ItemFacts,
  inputs: FreshInputs
): Verdict {
  const queued = inputs.queuedById.get(item.itemId)
  const itemRule = inputs.itemRuleById.get(item.itemId)
  if (item.locked === true) {
    if ((queued ?? itemRule?.action) === UNLOCK) {
      return { action: UNLOCK, destination: null, by: LOCKED_UNLOCK, ruleIndex: null }
    }
    return unlockedByOrderedRule(facts, inputs) ?? NO_MATCH_VERDICT
  }
  if (queued !== undefined) {
    return { action: queued, destination: null, by: VERDICT_OUTBOX, ruleIndex: null }
  }
  if (itemRule !== undefined) {
    return {
      action: itemRule.action,
      destination: itemRuleDestination(itemRule),
      by: ITEM_RULE,
      ruleIndex: null,
    }
  }
  const outcome = matchRules(inputs.orderedRules, facts, inputs.ctx)
  if (outcome.kind !== "matched") return NO_MATCH_VERDICT
  return {
    action: outcome.action,
    destination: outcome.destination ?? null,
    by: ORDERED_RULE,
    ruleIndex: outcome.rule.index,
  }
}

export function differingBetween(recorded: Verdict, fresh: Verdict): readonly string[] {
  const out: string[] = []
  if (recorded.action !== fresh.action) out.push(ACTION)
  if (recorded.destination !== fresh.destination) out.push(DESTINATION)
  if (
    recorded.by === ORDERED_RULE &&
    fresh.by === ORDERED_RULE &&
    recorded.ruleIndex !== fresh.ruleIndex
  ) {
    out.push(RULE)
  }
  return out
}

export function verdictSaid(one: Verdict): string {
  const destination = one.destination === null ? "" : ` to ${one.destination}`
  const index = one.ruleIndex === null ? "" : ` ${String(one.ruleIndex)}`
  return `${one.action}${destination}  (${one.by ?? ABSENT}${index})`
}

const QUEUED_VERDICT_SCHEMA = z.object({
  kind: z.literal("item-rule-verdict"),
  itemId: z.number().int(),
  action: z.enum(["nothing", "sell"]),
})

export function queuedVerdictsIn(content: string): ReadonlyMap<number, string> {
  const found = new Map<number, string>()
  const defaultTable = asRecord(parseLuaSavedVariablesFile(content, VARIABLES_NAME).Default)
  const accountWide = defaultTable === undefined ? undefined : readFirstAccountWide(defaultTable)
  const outbox = asRecord(accountWide?.[OUTBOX_KEY])
  if (outbox === undefined) return found
  for (const entry of Object.values(outbox)) {
    const read = QUEUED_VERDICT_SCHEMA.safeParse(entry)
    if (read.success && !found.has(read.data.itemId)) found.set(read.data.itemId, read.data.action)
  }
  return found
}
