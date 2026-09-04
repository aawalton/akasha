import { DEFAULT_RULES } from "../default-rules-data/default-rules-data.module.code.ts"
import type {
  CategoryRule,
  InventoryRuleSettings,
  ItemAction,
  ItemRule,
  MoveToDestination,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function createDefaultRuleSettings(craftBagAccess = false): InventoryRuleSettings {
  return patchFurnitureVaultDestination(
    patchCraftBagDestination(
      {
        version: 2,
        rules: DEFAULT_RULES.map((r) => ({ ...r })),
      },
      craftBagAccess
    ),
    craftBagAccess
  )
}

export function patchCraftBagDestination(
  settings: InventoryRuleSettings,
  craftBagAccess: boolean
): InventoryRuleSettings {
  const fallback: MoveToDestination = "bank"
  return {
    ...settings,
    rules: settings.rules.map((r) => {
      if (r.action !== "move-to") return r
      if (craftBagAccess) {
        if (r.id === "crafting-craft-bag" && r.destination === fallback) {
          return { ...r, destination: "craft-bag" }
        }
        return r
      }
      if (r.destination === "craft-bag") {
        return { ...r, destination: fallback }
      }
      return r
    }),
  }
}

export function patchFurnitureVaultDestination(
  settings: InventoryRuleSettings,
  craftBagAccess: boolean
): InventoryRuleSettings {
  const fallback: MoveToDestination = "bank"
  return {
    ...settings,
    rules: settings.rules.map((r) => {
      if (r.action !== "move-to") return r
      if (craftBagAccess) {
        if (r.id === "furnishings-house-storage" && r.destination === fallback) {
          return { ...r, destination: "furniture-vault" }
        }
        return r
      }
      if (r.destination === "furniture-vault") {
        return { ...r, destination: fallback }
      }
      return r
    }),
  }
}

function omitUndefinedRuleFields(patch: Partial<CategoryRule>): Partial<CategoryRule> {
  const out: Partial<CategoryRule> = {}
  if (patch.categoryId !== undefined) out.categoryId = patch.categoryId
  if (patch.action !== undefined) out.action = patch.action
  if (patch.conditions !== undefined) out.conditions = patch.conditions
  if (patch.destination !== undefined) out.destination = patch.destination
  if (patch.stockScope !== undefined) out.stockScope = patch.stockScope
  if (patch.destinationChain !== undefined) out.destinationChain = patch.destinationChain
  if (patch.active !== undefined) out.active = patch.active
  if (patch.goal !== undefined) out.goal = patch.goal
  if (patch.title !== undefined) out.title = patch.title
  if (patch.notes !== undefined) out.notes = patch.notes
  return out
}

export function addCategoryRule(
  settings: InventoryRuleSettings,
  rule: {
    categoryId: string
    action: ItemAction
    conditions?: CategoryRule["conditions"]
    destination?: MoveToDestination
    stockScope?: CategoryRule["stockScope"]
    goal?: string | null
  }
): InventoryRuleSettings {
  const id = crypto.randomUUID().slice(0, 8)
  const created: CategoryRule = {
    id,
    categoryId: rule.categoryId,
    action: rule.action,
    active: false,
    updatedAt: Date.now(),
    ...omitUndefinedRuleFields({
      conditions: rule.conditions,
      destination: rule.destination,
      stockScope: rule.stockScope,
      goal: rule.goal,
    }),
  }
  return {
    ...settings,
    rules: [...settings.rules, created],
  }
}

export function lockCategoryRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  locked: boolean
): InventoryRuleSettings {
  return {
    ...settings,
    rules: settings.rules.map((r) => (r.id === ruleId ? { ...r, locked } : r)),
  }
}

export function removeCategoryRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
  return {
    ...settings,
    rules: settings.rules.filter((r) => r.id !== ruleId || r.locked),
  }
}

export function updateCategoryRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  patch: Partial<
    Pick<
      CategoryRule,
      | "categoryId"
      | "action"
      | "conditions"
      | "destination"
      | "stockScope"
      | "destinationChain"
      | "active"
      | "goal"
      | "title"
      | "notes"
    >
  >
): InventoryRuleSettings {
  return {
    ...settings,
    rules: settings.rules.map((r) =>
      r.id === ruleId && !r.locked
        ? { ...r, ...omitUndefinedRuleFields(patch), updatedAt: Date.now() }
        : r
    ),
  }
}

export function reorderCategoryRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  toIndex: number
): InventoryRuleSettings {
  const rules = [...settings.rules]
  const fromIndex = rules.findIndex((r) => r.id === ruleId)
  if (fromIndex === -1 || fromIndex === toIndex) return settings
  const removed = rules.splice(fromIndex, 1)
  const rule = removed[0]
  if (rule === undefined) return settings
  rules.splice(toIndex, 0, rule)
  return { ...settings, rules }
}

export function resolveAnchorIndex(
  settings: InventoryRuleSettings,
  ruleId: string,
  anchorId: string,
  position: "before" | "after"
): number | undefined {
  if (anchorId === ruleId) return undefined
  const without = settings.rules.filter((r) => r.id !== ruleId)
  const anchorIndex = without.findIndex((r) => r.id === anchorId)
  if (anchorIndex === -1) return undefined
  return position === "before" ? anchorIndex : anchorIndex + 1
}

export function duplicateCategoryRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
  const sourceIndex = settings.rules.findIndex((r) => r.id === ruleId)
  if (sourceIndex === -1) return settings
  const source = settings.rules[sourceIndex]
  if (source === undefined) return settings
  const id = crypto.randomUUID().slice(0, 8)
  const clone: CategoryRule = {
    ...source,
    id,
    locked: false,
    active: false,
    updatedAt: Date.now(),
  }
  const rules = [...settings.rules]
  rules.splice(sourceIndex + 1, 0, clone)
  return { ...settings, rules }
}

export function addItemRule(
  settings: InventoryRuleSettings,
  rule: {
    itemId: number
    itemName: string
    action: ItemAction
  }
): InventoryRuleSettings {
  const newRule: ItemRule = {
    id: crypto.randomUUID(),
    itemId: rule.itemId,
    itemName: rule.itemName,
    action: rule.action,
    updatedAt: Date.now(),
  }
  return {
    ...settings,
    itemRules: [newRule, ...(settings.itemRules ?? [])],
  }
}

export function upsertItemRuleByItemId(
  settings: InventoryRuleSettings,
  rule: {
    itemId: number
    itemName: string
    action: ItemAction
  }
): InventoryRuleSettings {
  const existing = settings.itemRules ?? []
  const matchIndex = existing.findIndex((r) => r.itemId === rule.itemId)
  if (matchIndex === -1) return addItemRule(settings, rule)
  const match = existing[matchIndex]
  if (match === undefined || match.locked === true) return settings
  const updated: ItemRule = {
    ...match,
    itemName: rule.itemName,
    action: rule.action,
    updatedAt: Date.now(),
  }
  const itemRules = [...existing]
  itemRules[matchIndex] = updated
  return { ...settings, itemRules }
}

export function lockItemRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  locked: boolean
): InventoryRuleSettings {
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).map((r) => (r.id === ruleId ? { ...r, locked } : r)),
  }
}

export function removeItemRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).filter((r) => r.id !== ruleId || r.locked),
  }
}

export function duplicateItemRule(
  settings: InventoryRuleSettings,
  ruleId: string
): InventoryRuleSettings {
  const itemRules = settings.itemRules ?? []
  const sourceIndex = itemRules.findIndex((r) => r.id === ruleId)
  if (sourceIndex === -1) return settings
  const source = itemRules[sourceIndex]
  if (source === undefined) return settings
  const id = crypto.randomUUID().slice(0, 8)
  const clone: ItemRule = {
    ...source,
    id,
    locked: false,
    active: false,
    updatedAt: Date.now(),
  }
  const newItemRules = [...itemRules]
  newItemRules.splice(sourceIndex + 1, 0, clone)
  return { ...settings, itemRules: newItemRules }
}

export function updateItemRule(
  settings: InventoryRuleSettings,
  ruleId: string,
  patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  >
): InventoryRuleSettings {
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).map((r) =>
      r.id === ruleId && !r.locked ? { ...r, ...patch, updatedAt: Date.now() } : r
    ),
  }
}

export function bulkLockCategoryRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[],
  locked: boolean
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    rules: settings.rules.map((r) => (idSet.has(r.id) ? { ...r, locked } : r)),
  }
}

export function bulkLockItemRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[],
  locked: boolean
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).map((r) => (idSet.has(r.id) ? { ...r, locked } : r)),
  }
}

export function bulkUpdateCategoryRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[],
  patch: Partial<
    Pick<
      CategoryRule,
      | "categoryId"
      | "action"
      | "conditions"
      | "destination"
      | "destinationChain"
      | "stockScope"
      | "active"
      | "goal"
      | "title"
      | "notes"
    >
  >,
  options?: { force?: boolean }
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  const cleanPatch = omitUndefinedRuleFields(patch)
  return {
    ...settings,
    rules: settings.rules.map((r) =>
      idSet.has(r.id) && (options?.force || !r.locked)
        ? { ...r, ...cleanPatch, updatedAt: Date.now() }
        : r
    ),
  }
}

export function bulkRemoveCategoryRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[]
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    rules: settings.rules.filter((r) => !idSet.has(r.id) || r.locked),
  }
}

export function bulkUpdateItemRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[],
  patch: Partial<
    Pick<
      ItemRule,
      "action" | "destination" | "active" | "goal" | "title" | "notes" | "stockQuantity"
    >
  >,
  options?: { force?: boolean }
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).map((r) =>
      idSet.has(r.id) && (options?.force || !r.locked)
        ? { ...r, ...patch, updatedAt: Date.now() }
        : r
    ),
  }
}

export function bulkRemoveItemRules(
  settings: InventoryRuleSettings,
  ruleIds: readonly string[]
): InventoryRuleSettings {
  const idSet = new Set(ruleIds)
  return {
    ...settings,
    itemRules: (settings.itemRules ?? []).filter((r) => !idSet.has(r.id) || r.locked),
  }
}
