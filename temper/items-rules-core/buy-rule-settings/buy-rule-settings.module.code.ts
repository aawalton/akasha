import type { BuyRule, BuySource } from "../buy-rule-types/buy-rule-types.module.code.ts"
import type { InventoryRuleSettings } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function addBuyRule(
  settings: InventoryRuleSettings,
  rule: { itemId: number; itemName: string; targetQuantity: number; source?: BuySource }
): InventoryRuleSettings {
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
  settings: InventoryRuleSettings,
  ruleId: string,
  patch: Partial<Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">>
): InventoryRuleSettings {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) =>
      r.id === ruleId && !r.locked ? { ...r, ...patch, updatedAt: Date.now() } : r
    ),
  }
}

export function removeBuyRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).filter((r) => r.id !== ruleId || r.locked),
  }
}

export function lockBuyRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  locked: boolean
): InventoryRuleSettings {
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) => (r.id === ruleId ? { ...r, locked } : r)),
  }
}

export function duplicateBuyRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
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
  settings: InventoryRuleSettings,
  ruleIds: readonly string[],
  patch: Partial<
    Pick<BuyRule, "targetQuantity" | "source" | "active" | "goal" | "title" | "notes">
  >,
  opts?: { force?: boolean }
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    buyRules: (settings.buyRules ?? []).map((r) =>
      idSet.has(r.id) && (opts?.force || !r.locked) ? { ...r, ...patch, updatedAt: Date.now() } : r
    ),
  }
}
