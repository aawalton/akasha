import type { InventoryLocationConditionId } from "akasha/temper/items-core/location-condition/location-condition.module.code.ts"
import type { ComparisonOpId } from "akasha/temper/items-rules-core/comparison-op-data/comparison-op-data.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  type CompanionScope,
  type DestinationChain,
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemAction,
  type StockScope,
} from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { BuySource } from "akasha/temper/items-rules-core/modules/buy-rule-types/buy-rule-types.module.code.ts"
import type { CanLevelMorphsCondition } from "akasha/temper/items-rules-core/modules/can-level-morphs-filter-types/can-level-morphs-filter-types.module.code.ts"
import type { RequiredCurseStateCondition } from "akasha/temper/items-rules-core/required-curse-state-filter-types/required-curse-state-filter-types.module.code.ts"
import type { RequiredSkillLinesCondition } from "akasha/temper/items-rules-core/required-skill-lines-filter-types/required-skill-lines-filter-types.module.code.ts"
import type { RuleConstantKey } from "akasha/temper/items-rules-core/rule-constants/rule-constants.module.code.ts"

export type CharacterScope = "current-character" | "any-character" | `character:${string}`

export interface ResolvedEntry {
  action: ItemAction
  destination?: string
  maxQuality?: number
  qualityOp?: ComparisonOpId
  maxLevel?: number
  levelOp?: ComparisonOpId
  setSourceTypes?: readonly string[]
  bound?: "bound" | "not-bound"
  bopTradeable?: "bop-tradeable" | "not-bop-tradeable"
  questRelevant?: "quest-relevant" | "not-quest-relevant"
  locked?: "locked" | "not-locked"
  known?: "known" | "not-known"
  canResearch?: "can-research" | "cannot-research"
  researchScope?: CharacterScope
  canInspire?: "can-inspire" | "cannot-inspire"
  inspireScope?: CharacterScope
  canUnlock?: "can-unlock" | "cannot-unlock"
  unlockScope?: CharacterScope
  canSell?: "can-sell"
  canListAtGuildTrader?: "can-list-at-guild-trader"
  canCompanionEquip?: "can-companion-equip" | "cannot-companion-equip"
  isTargetEquip?: "is-target-equip" | "not-target-equip"
  targetEquipScope?: CharacterScope
  isTargetCompanionEquip?: "is-target-companion-equip" | "not-target-companion-equip"
  targetCompanionEquipScope?: CompanionScope
  allStocked?: "all-stocked" | "not-all-stocked"
  stockThreshold?: number
  maxValue?: number
  minValue?: number
  value?: number | RuleConstantKey
  valueOp?: ComparisonOpId
  marketValue?: number | RuleConstantKey
  marketValueOp?: ComparisonOpId
  merchantValue?: number | RuleConstantKey
  merchantValueOp?: ComparisonOpId
  replacementValue?: number | RuleConstantKey
  replacementValueOp?: ComparisonOpId
  keepQuantity?: number
  targetQuantity?: number
  stockScope?: StockScope
  destinationChain?: DestinationChain
  itemNamePattern?: string
  requiredSkillLines?: RequiredSkillLinesCondition
  requiredCurseState?: RequiredCurseStateCondition
  canLevelMorphs?: CanLevelMorphsCondition
}

export interface WantedEquipmentSignature {
  esoCharId: string
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
}

export interface WantedCompanionEquipmentSignature {
  companionName: string
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
}

export interface CompiledCurrencyRule {
  action: "move-to" | "stock" | "keep-floor"
  destination: "bank" | "character" | "guild-bank"
  targetAmount?: number
  keepAmount?: number
}

export interface CompiledBuyRule {
  targetQuantity: number
  source: BuySource
}

export interface CompiledOrderedRule extends ResolvedEntry {
  id?: string
  active?: boolean
  categoryId: string
  stolen?: "stolen" | "not-stolen"
  crafted?: "crafted" | "not-crafted"
  reconstructed?: "reconstructed" | "not-reconstructed"
  transmuted?: "transmuted" | "not-transmuted"
  canOpen?: "can-open"
  canGiveMaxRewards?: "can-give-max-rewards"
  traits?: readonly string[]
  location?: readonly InventoryLocationConditionId[]
  stackFullness?: "full" | "partial"
  potionEffects?: readonly string[]
  potionEffectsMode?: "all" | "any"
}

export const IMPLICIT_TERMINAL_COMPILED_RULE: CompiledOrderedRule = {
  id: IMPLICIT_TERMINAL_RULE_ID,
  categoryId: ALL_CATEGORIES_ID,
  action: "nothing",
}

export interface CompiledRuleConfig {
  version: 3
  orderedRules: readonly CompiledOrderedRule[]
  itemRules: Record<number, ResolvedEntry>
  wantedEquipment: readonly WantedEquipmentSignature[]
  wantedCompanionEquipment: readonly WantedCompanionEquipmentSignature[]
  wantedConsumables: Record<number, string[]>
  consumableStock: Record<number, Record<string, number>>
  characterPriority?: readonly string[]
  currencyRules?: Record<string, CompiledCurrencyRule>
  buyRules?: Record<number, CompiledBuyRule>
  buyStockAvailable?: boolean
  buyStockByChar?: Record<number, Record<string, number>>
  buyStockAccount?: Record<number, number>
}
