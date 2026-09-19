import { recordSettlingMs } from "akasha/temper/items-addon/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import {
  buildItemFactsForSlot,
  resolveItemKey,
} from "akasha/temper/items-addon/modules/inventory-build-item-facts/inventory-build-item-facts.module.code.ts"
import { refreshEquipmentLockOverlays } from "akasha/temper/items-addon/modules/inventory-equipment-lock-overlay/inventory-equipment-lock-overlay.module.code.ts"
import { buildEsoEvalEnv } from "akasha/temper/items-addon/modules/inventory-eso-eval-env/inventory-eso-eval-env.module.code.ts"
import {
  isItemLocked,
  resolvePriceSource,
} from "akasha/temper/items-addon/modules/inventory-item-data/inventory-item-data.module.code.ts"
import {
  getEffectiveItemRuleAction,
  getItemRuleVerdictAction,
} from "akasha/temper/items-addon/modules/inventory-item-rule-verdict-store/inventory-item-rule-verdict-store.module.code.ts"
import { setItemIsJunkGated } from "akasha/temper/items-addon/modules/inventory-junk-queue/inventory-junk-queue.module.code.ts"
import { refreshLockOverlays } from "akasha/temper/items-addon/modules/inventory-lock-overlay/inventory-lock-overlay.module.code.ts"
import { recordResolvedAction } from "akasha/temper/items-addon/modules/inventory-resolved-action-record/inventory-resolved-action-record.module.code.ts"
import {
  applyAction,
  clearAllPendingActions,
  clearPendingAction,
  getCompiledConfig,
} from "akasha/temper/items-addon/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { dispatchUseActions } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-use/inventory-rules-dispatch-use.module.code.ts"
import { resolveEntryAllocation } from "akasha/temper/items-addon/modules/inventory-rules-eval-allocation/inventory-rules-eval-allocation.module.code.ts"
import { setRescanInventoryRef } from "akasha/temper/items-addon/modules/inventory-rules-rescan-ref/inventory-rules-rescan-ref.module.code.ts"
import type { UseAllocation } from "akasha/temper/items-addon/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import type { ResolvedActionSource } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type {
  ItemAction,
  StockScope,
} from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { CharacterId } from "akasha/temper/items-rules-core/modules/use-destination-types/use-destination-types.module.code.ts"
import { computeStockGroups } from "akasha/temper/items-rules-eval/modules/compute-stock-groups/compute-stock-groups.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/modules/eval-env/eval-env.module.code.ts"
import {
  evaluateRule,
  matchRules,
} from "akasha/temper/items-rules-eval/modules/evaluator/evaluator.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
export interface MatchedRuleResult {
  ruleIndex: number
  ruleSource: ResolvedActionSource
  action: ItemAction
  destination: string | undefined
  targetQuantity: number | undefined
  stockScope: StockScope | undefined
  useAllocation: UseAllocation | undefined
}

export function findMatchedRule(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): MatchedRuleResult | undefined {
  const [stackSize] = GetSlotStackSize(bagId, slotIndex)
  if (stackSize === 0) return undefined

  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
  if (itemLink === "") return undefined

  const isLocked = isItemLocked(bagId, slotIndex)

  if (!isLocked) {
    const itemId = GetItemLinkItemId(itemLink)
    const verdictAction = getItemRuleVerdictAction(itemId)
    if (verdictAction !== undefined) {
      return {
        ruleIndex: -1,
        ruleSource: "item-verdict-outbox",
        action: verdictAction,
        destination: undefined,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    const itemRule = compiled.itemRules[itemId]
    if (itemRule !== undefined) {
      let useItemKey: ItemFacts["itemKey"]
      if (itemRule.action === "use") {
        const [itemType] = GetItemLinkItemType(itemLink)
        useItemKey = resolveItemKey(itemLink, itemType, itemId)
      }
      const resolved = resolveEntryAllocation(itemRule, itemRule.action, itemRule.destination, {
        bagId,
        slotIndex,
        itemKey: useItemKey,
        itemLink,
        claims,
      })
      return {
        ruleIndex: -1,
        ruleSource: "item-rule",
        action: itemRule.action,
        destination: resolved.destination,
        targetQuantity: resolved.targetQuantity,
        stockScope: itemRule.action === "stock" ? itemRule.stockScope : undefined,
        useAllocation: resolved.useAllocation,
      }
    }
  }

  const facts = buildItemFactsForSlot(bagId, slotIndex)
  if (facts === undefined) return undefined

  const env = buildEsoEvalEnv()
  const ctx: EvalContext = {
    env,
    priceTableMissing: resolvePriceSource() === "ttc-no-table",
    claimedByCharacter: claims,
    stockGroupByRuleId: stockGroups,
  }

  if (isLocked) {
    const lockedItemId = GetItemLinkItemId(itemLink)
    if (getEffectiveItemRuleAction(lockedItemId, compiled) === "unlock") {
      return {
        ruleIndex: -1,
        ruleSource: "locked-unlock",
        action: "unlock",
        destination: undefined,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    for (let i = 0; i < compiled.orderedRules.length; i++) {
      const rule = compiled.orderedRules[i]
      if (rule === undefined) continue
      if (rule.locked !== "locked" || rule.action !== "unlock") continue
      const result = evaluateRule(rule, i, facts, ctx)
      if (result.verdict.kind !== "matched") continue
      return {
        ruleIndex: i,
        ruleSource: "ordered-rule",
        action: "unlock",
        destination: result.resolvedDestination ?? rule.destination,
        targetQuantity: undefined,
        stockScope: undefined,
        useAllocation: undefined,
      }
    }
    return undefined
  }

  const walkStart = GetGameTimeMilliseconds()
  const outcome = matchRules(compiled.orderedRules, facts, ctx)
  recordSettlingMs("walkRules", GetGameTimeMilliseconds() - walkStart)
  if (outcome.kind !== "matched") return undefined

  const matchedIndex = outcome.rule.index
  const compiledRule = compiled.orderedRules[matchedIndex]
  if (compiledRule === undefined) return undefined

  const resolved = resolveEntryAllocation(compiledRule, outcome.action, outcome.destination, {
    bagId,
    slotIndex,
    itemKey: facts.itemKey,
    itemLink,
    claims,
  })

  return {
    ruleIndex: matchedIndex,
    ruleSource: "ordered-rule",
    action: outcome.action,
    destination: resolved.destination,
    targetQuantity: resolved.targetQuantity,
    stockScope: compiledRule.action === "stock" ? compiledRule.stockScope : undefined,
    useAllocation: resolved.useAllocation,
  }
}

export function evaluateRules(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): MatchedRuleResult | undefined {
  const start = GetGameTimeMilliseconds()
  const matched = evaluateRulesInner(bagId, slotIndex, claims, stockGroups)
  recordSettlingMs("evaluateRules", GetGameTimeMilliseconds() - start)
  return matched
}

function evaluateRulesInner(
  bagId: number,
  slotIndex: number,
  claims?: Map<CharacterId, Set<string>>,
  stockGroups?: ReadonlyMap<string, ReadonlySet<number>>
): MatchedRuleResult | undefined {
  clearPendingAction(bagId, slotIndex)

  const matched = findMatchedRule(bagId, slotIndex, claims, stockGroups)
  if (matched === undefined) {
    if (getCompiledConfig() !== undefined) {
      recordResolvedAction(bagId, slotIndex, { action: "nothing", ruleSource: "no-match" })
    }
    if (!IsItemPlayerLocked(bagId, slotIndex) && IsItemJunk(bagId, slotIndex)) {
      setItemIsJunkGated(bagId, slotIndex, false)
    }
    return undefined
  }

  recordResolvedAction(bagId, slotIndex, {
    action: matched.action,
    destination: matched.destination,
    ruleSource: matched.ruleSource,
    ruleIndex: matched.ruleSource === "ordered-rule" ? matched.ruleIndex : undefined,
  })

  if (matched.action === "move-to" && matched.destination !== undefined) {
    if (matched.destination.startsWith("character:")) {
      const charId = matched.destination.substring("character:".length)
      if (
        charId === tostring(GetCurrentCharacterId()) &&
        (bagId === BAG_BACKPACK || bagId === BAG_WORN)
      ) {
        if (IsItemJunk(bagId, slotIndex)) {
          setItemIsJunkGated(bagId, slotIndex, false)
        }
        return matched
      }
    }
  }

  applyAction(
    bagId,
    slotIndex,
    matched.action,
    matched.destination,
    matched.targetQuantity,
    matched.stockScope,
    matched.ruleIndex,
    matched.useAllocation
  )
  if (matched.action !== "sell" && IsItemJunk(bagId, slotIndex)) {
    setItemIsJunkGated(bagId, slotIndex, false)
  }
  return matched
}

function computeBackpackStockGroups(): ReadonlyMap<string, ReadonlySet<number>> | undefined {
  const compiled = getCompiledConfig()
  if (compiled === undefined) return undefined

  const corpus: ItemFacts[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    const facts = buildItemFactsForSlot(BAG_BACKPACK, slot)
    if (facts !== undefined) corpus.push(facts)
  }

  const env = buildEsoEvalEnv()
  return computeStockGroups(compiled.orderedRules, corpus, factsIdentity, env)
}

function factsIdentity(facts: ItemFacts): ItemFacts {
  return facts
}

export function refreshBackpackActions(): undefined {
  const claims = new Map<CharacterId, Set<string>>()
  const stockGroups = computeBackpackStockGroups()
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    evaluateRules(BAG_BACKPACK, slot, claims, stockGroups)
  }
}

function refreshWornActions(): undefined {
  const claims = new Map<CharacterId, Set<string>>()
  const bagSize = GetBagSize(BAG_WORN)
  for (let slot = 0; slot < bagSize; slot++) {
    evaluateRules(BAG_WORN, slot, claims)
  }
}

export function rescanInventory(): undefined {
  clearAllPendingActions()
  refreshBackpackActions()
  refreshWornActions()
  dispatchUseActions()
  fireInventoryActionsChanged()
  refreshLockOverlays()
  refreshEquipmentLockOverlays()
}

export function rescanWornItems(): undefined {
  refreshWornActions()
  refreshLockOverlays()
  refreshEquipmentLockOverlays()
}

setRescanInventoryRef(rescanInventory)

const ACTIONS_CHANGED_DEBOUNCE_MS = 500
let actionsChangedPending = false

export function fireInventoryActionsChanged(): undefined {
  if (actionsChangedPending) return
  actionsChangedPending = true
  zo_callLater(function (this: void): undefined {
    actionsChangedPending = false
    const start = GetGameTimeMilliseconds()
    CALLBACK_MANAGER.FireCallbacks("Temper_InventoryActionsChanged")
    recordSettlingMs("actionsChanged", GetGameTimeMilliseconds() - start)
  }, ACTIONS_CHANGED_DEBOUNCE_MS)
}
