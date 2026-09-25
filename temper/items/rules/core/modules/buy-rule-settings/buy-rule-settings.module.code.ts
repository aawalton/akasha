import type {
  BuyRule,
  BuySource,
} from "akasha/temper/items/rules/core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import type { InventoryRules } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"

export function addBuyRule(
  settings: InventoryRules,
  rule: { itemId: number; itemName: string; targetQuantity: number; source?: BuySource }
): InventoryRules {
  const newRule: BuyRule = {
    id: crypto.randomUUID(),
    itemId: rule.itemId,
    itemName: rule.itemName,
    targetQuantity: rule.targetQuantity,
    source: rule.source ?? "merchant",
    active: false,
    updatedAt: Date.now(),
  }
  return {
    ...settings,
    buyRules: [newRule, ...(settings.buyRules ?? [])],
  }
}

export function updateBuyRule(
  settings: InventoryRules,
  ruleId: string,
  patch: Partial<Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">>
): InventoryRules {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) =>
      r.id === ruleId && !r.locked ? { ...r, ...patch, updatedAt: Date.now() } : r
    ),
  }
}

export function removeBuyRule(settings: InventoryRules, ruleId: string): InventoryRules {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).filter((r) => r.id !== ruleId || r.locked),
  }
}

export function lockBuyRule(
  settings: InventoryRules,
  ruleId: string,
  locked: boolean
): InventoryRules {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) => (r.id === ruleId ? { ...r, locked } : r)),
  }
}

export function duplicateBuyRule(settings: InventoryRules, ruleId: string): InventoryRules {
  const buyRules = settings.buyRules ?? []
  const sourceIndex = buyRules.findIndex((r) => r.id === ruleId)
  if (sourceIndex === -1) return settings
  const source = buyRules[sourceIndex]
  if (source === undefined) return settings
  const clone: BuyRule = {
    ...source,
    id: crypto.randomUUID().slice(0, 8),
    locked: false,
    active: false,
    updatedAt: Date.now(),
  }
  const newBuyRules = [...buyRules]
  newBuyRules.splice(sourceIndex + 1, 0, clone)
  return { ...settings, buyRules: newBuyRules }
}

export function bulkUpdateBuyRules(
  settings: InventoryRules,
  ruleIds: readonly string[],
  patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  >,
  opts?: { force?: boolean }
): InventoryRules {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) =>
      idSet.has(r.id) && (opts?.force || !r.locked) ? { ...r, ...patch, updatedAt: Date.now() } : r
    ),
  }
}
