import {
  deriveCharacterScope,
  deriveCompanionScope,
} from "../inventory-rule-compiler-sparse/inventory-rule-compiler-sparse.module.code.ts"
import type {
  CompiledBuyRule,
  CompiledCurrencyRule,
  CompiledOrderedRule,
  CompiledRuleConfig,
  ResolvedEntry,
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "../inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  CURRENCY_CATEGORY_PREFIX,
  CURRENCY_CATEGORY_TO_KEY,
  CURRENCY_CHILD_IDS,
  type InventoryRuleSettings,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

const IMPLICIT_TERMINAL_COMPILED_RULE: CompiledOrderedRule = {
  categoryId: ALL_CATEGORIES_ID,
  action: "nothing",
}

export function compileCategoryRuleToOrdered(rule: CategoryRule): CompiledOrderedRule {
  const entry: CompiledOrderedRule = {
    categoryId: rule.categoryId,
    action: rule.action,
  }
  if (rule.id != null) entry.id = rule.id
  if (rule.active === false) entry.active = false
  if (rule.destination != null) entry.destination = rule.destination

  const c = rule.conditions
  if (c) {
    if (c.stolen != null) entry.stolen = c.stolen
    if (c.crafted != null) entry.crafted = c.crafted
    if (c.bound != null) entry.bound = c.bound
    if (c.bopTradeable != null) entry.bopTradeable = c.bopTradeable
    if (c.questRelevant != null) entry.questRelevant = c.questRelevant
    if (c.locked != null) entry.locked = c.locked
    if (c.reconstructed != null) entry.reconstructed = c.reconstructed
    if (c.transmuted != null) entry.transmuted = c.transmuted
    if (c.known != null) entry.known = c.known
    if (c.canOpen != null) entry.canOpen = c.canOpen
    if (c.canSell != null) entry.canSell = c.canSell
    if (c.canListAtGuildTrader != null) entry.canListAtGuildTrader = c.canListAtGuildTrader
    if (c.canGiveMaxRewards != null) entry.canGiveMaxRewards = c.canGiveMaxRewards
    if ((c.traits?.length ?? 0) > 0) entry.traits = c.traits
    if ((c.location?.length ?? 0) > 0) entry.location = c.location
    if (c.maxQuality !== undefined) entry.maxQuality = c.maxQuality
    if (c.qualityOp != null) entry.qualityOp = c.qualityOp
    if (c.maxLevel !== undefined) entry.maxLevel = c.maxLevel
    if (c.levelOp != null) entry.levelOp = c.levelOp
    if ((c.setSourceTypes?.length ?? 0) > 0) entry.setSourceTypes = c.setSourceTypes
    if (c.value !== undefined) entry.value = c.value
    if (c.valueOp != null) entry.valueOp = c.valueOp
    if (c.marketValue !== undefined) entry.marketValue = c.marketValue
    if (c.marketValueOp != null) entry.marketValueOp = c.marketValueOp
    if (c.marketValue === undefined) {
      if (c.maxValue !== undefined) entry.maxValue = c.maxValue
      if (c.minValue !== undefined) entry.minValue = c.minValue
    }
    if (c.merchantValue !== undefined) entry.merchantValue = c.merchantValue
    if (c.merchantValueOp != null) entry.merchantValueOp = c.merchantValueOp
    if (c.replacementValue !== undefined) entry.replacementValue = c.replacementValue
    if (c.replacementValueOp != null) entry.replacementValueOp = c.replacementValueOp
    if (c.keepQuantity !== undefined) entry.keepQuantity = c.keepQuantity
    if (c.targetQuantity !== undefined) entry.targetQuantity = c.targetQuantity
    if (c.canResearch != null) {
      entry.canResearch = c.canResearch
      entry.researchScope = deriveCharacterScope(rule.destination)
    }
    if (c.canInspire != null) {
      entry.canInspire = c.canInspire
      entry.inspireScope = deriveCharacterScope(rule.destination)
    }
    if (c.canUnlock != null) {
      entry.canUnlock = c.canUnlock
      entry.unlockScope = deriveCharacterScope(rule.destination)
    }
    if (c.canCompanionEquip != null) entry.canCompanionEquip = c.canCompanionEquip
    if (c.isTargetEquip != null) {
      entry.isTargetEquip = c.isTargetEquip
      entry.targetEquipScope = deriveCharacterScope(rule.destination)
    }
    if (c.isTargetCompanionEquip != null) {
      entry.isTargetCompanionEquip = c.isTargetCompanionEquip
      entry.targetCompanionEquipScope = deriveCompanionScope(rule.destination)
    }
    if (c.allStocked != null) entry.allStocked = c.allStocked
    if (c.stockThreshold !== undefined) entry.stockThreshold = c.stockThreshold
    if (c.itemNamePattern != null) entry.itemNamePattern = c.itemNamePattern
    if (c.requiredSkillLines != null && c.requiredSkillLines.skillLineIds.length > 0) {
      entry.requiredSkillLines = c.requiredSkillLines
    }
    if (c.requiredCurseState != null) {
      entry.requiredCurseState = c.requiredCurseState
    }
    if (c.canLevelMorphs != null) {
      entry.canLevelMorphs = c.canLevelMorphs
    }
    if (c.stackFullness != null) entry.stackFullness = c.stackFullness
    if ((c.potionEffects?.length ?? 0) > 0) {
      entry.potionEffects = c.potionEffects
      if (c.potionEffectsMode != null) entry.potionEffectsMode = c.potionEffectsMode
    }
  }
  if (rule.destinationChain !== undefined && rule.destinationChain.length > 0) {
    entry.destinationChain = rule.destinationChain
  }
  if (rule.action === "stock") {
    entry.stockScope = rule.stockScope ?? "any-character"
  }
  return entry
}

export function compileRules(
  settings: InventoryRuleSettings,
  wantedEquipment: readonly WantedEquipmentSignature[] = [],
  wantedCompanionEquipment: readonly WantedCompanionEquipmentSignature[] = [],
  wantedConsumables: Record<number, string[]> = {},
  consumableStock: Record<number, Record<string, number>> = {},
  characterPriority: readonly string[] = []
): CompiledRuleConfig {
  const allActiveRules = settings.rules.filter((r) => r.active !== false)
  const activeItemRules = (settings.itemRules ?? []).filter((r) => r.active !== false)

  const activeRules: CategoryRule[] = []
  const currencyCategoryRules: CategoryRule[] = []
  for (const rule of allActiveRules) {
    if (rule.categoryId === "currency" || rule.categoryId.startsWith(CURRENCY_CATEGORY_PREFIX)) {
      currencyCategoryRules.push(rule)
    } else {
      activeRules.push(rule)
    }
  }

  const orderedRules: CompiledOrderedRule[] = activeRules.map(compileCategoryRuleToOrdered)

  orderedRules.push(IMPLICIT_TERMINAL_COMPILED_RULE)

  const itemRules: Record<number, ResolvedEntry> = {}
  for (const rule of activeItemRules) {
    const entry: ResolvedEntry = { action: rule.action }
    if (rule.destination != null) entry.destination = rule.destination
    if (rule.stockQuantity !== undefined) entry.targetQuantity = rule.stockQuantity
    if (rule.action === "stock") {
      entry.stockScope = rule.stockScope ?? "any-character"
    }
    if (rule.destinationChain !== undefined && rule.destinationChain.length > 0) {
      entry.destinationChain = rule.destinationChain
    }
    itemRules[rule.itemId] = entry
  }

  const compiledCurrencyRules: Record<string, CompiledCurrencyRule> = {}
  for (const rule of currencyCategoryRules) {
    const targetKeys: string[] = []
    if (rule.categoryId === "currency") {
      for (const childId of CURRENCY_CHILD_IDS) {
        const key = CURRENCY_CATEGORY_TO_KEY[childId]
        if (key != null && !(key in compiledCurrencyRules)) targetKeys.push(key)
      }
    } else {
      const key = CURRENCY_CATEGORY_TO_KEY[rule.categoryId]
      if (key != null && !(key in compiledCurrencyRules)) targetKeys.push(key)
    }

    let destination: "bank" | "character" | "guild-bank"
    if (rule.destination === "bank") {
      destination = "bank"
    } else if (rule.destination === "guild-bank") {
      destination = "guild-bank"
    } else {
      destination = "character"
    }

    const keepFloor = rule.conditions?.keepFloor
    let action: "move-to" | "stock" | "keep-floor"
    if (rule.action === "stock") {
      action = "stock"
    } else if (keepFloor !== undefined && destination !== "character") {
      action = "keep-floor"
    } else {
      action = "move-to"
    }

    for (const key of targetKeys) {
      const entry: CompiledCurrencyRule = { action, destination }
      if (action === "stock" && rule.conditions?.targetQuantity !== undefined) {
        entry.targetAmount = rule.conditions.targetQuantity
      }
      if (action === "keep-floor" && keepFloor !== undefined) {
        entry.keepAmount = keepFloor
      }
      compiledCurrencyRules[key] = entry
    }
  }

  const compiledBuyRules: Record<number, CompiledBuyRule> = {}
  for (const rule of settings.buyRules ?? []) {
    if (rule.active === false) continue
    compiledBuyRules[rule.itemId] = { targetQuantity: rule.targetQuantity, source: rule.source }
  }

  return {
    version: 3,
    orderedRules,
    itemRules,
    wantedEquipment,
    wantedCompanionEquipment,
    wantedConsumables,
    consumableStock,
    ...(characterPriority.length > 0 ? { characterPriority } : {}),
    ...(Object.keys(compiledCurrencyRules).length > 0
      ? { currencyRules: compiledCurrencyRules }
      : {}),
    ...(Object.keys(compiledBuyRules).length > 0 ? { buyRules: compiledBuyRules } : {}),
  }
}
