import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import type { BuyRule } from "../buy-rule-types/buy-rule-types.module.code.ts"
import type { CanLevelMorphsCondition } from "../can-level-morphs-filter-types/can-level-morphs-filter-types.module.code.ts"
import type { ComparisonOpId } from "../comparison-op-data/comparison-op-data.module.code.ts"
import type { RequiredCurseStateCondition } from "../required-curse-state-filter-types/required-curse-state-filter-types.module.code.ts"
import type { RequiredSkillLinesCondition } from "../required-skill-lines-filter-types/required-skill-lines-filter-types.module.code.ts"
import type { RuleConstantKey } from "../rule-constants/rule-constants.module.code.ts"

const BANKABLE_CURRENCY_KEYS = ["gold", "alliancePoints", "telvarStones", "writVouchers"] as const
type BankableCurrencyKey = (typeof BANKABLE_CURRENCY_KEYS)[number]

export const CURRENCY_CATEGORY_PREFIX = "currency-"

export const CURRENCY_CATEGORY_TO_KEY: Record<string, BankableCurrencyKey> = {
  "currency-gold": "gold",
  "currency-alliance-points": "alliancePoints",
  "currency-telvar-stones": "telvarStones",
  "currency-writ-vouchers": "writVouchers",
}

export const CURRENCY_CHILD_IDS = Object.keys(CURRENCY_CATEGORY_TO_KEY)

export type CompanionScope = "active-companion" | "any-companion"

export type StockScope = "current-character" | "any-character"

export const ALL_CATEGORIES_ID = "all"

export const ALL_CATEGORIES_NODE = { id: ALL_CATEGORIES_ID, name: "All Categories" } as const

export const IMPLICIT_TERMINAL_RULE_ID = "_implicit_all_nothing"

export type MoveToDestination =
  | "bank"
  | "craft-bag"
  | "furniture-vault"
  | "house-storage"
  | `house-storage:${string}`
  | `character:${string}`
  | `character-worn:${string}`
  | `companion-worn:${string}`
  | "guild-bank"
  | `guild-bank:${string}`
  | `mail:${string}`

export type DestinationCategory =
  | "bank"
  | "character"
  | "craft-bag"
  | "guild-bank"
  | "housing-storage"

export const ITEM_ACTION_VALUES = [
  "nothing",
  "lock",
  "unlock",
  "move-to",
  "stock",
  "character-equip",
  "companion-equip",
  "deconstruct",
  "refine",
  "destroy",
  "fence-launder",
  "fence-sell",
  "list",
  "mail",
  "research",
  "sell",
  "use",
  "open",
] as const

export type ItemAction = (typeof ITEM_ACTION_VALUES)[number]

export function isMoveLikeAction(action: ItemAction): boolean {
  return (
    action === "move-to" ||
    action === "stock" ||
    action === "character-equip" ||
    action === "companion-equip"
  )
}

export interface CategoryRule {
  id: string
  categoryId: string
  action: ItemAction
  active?: boolean
  locked?: boolean
  goal?: string | null
  title?: string | null
  notes?: string | null
  destination?: MoveToDestination
  stockScope?: StockScope
  destinationChain?: DestinationChain
  updatedAt?: number
  conditions?: {
    maxQuality?: number
    qualityOp?: ComparisonOpId
    traits?: readonly string[]
    setSourceTypes?: readonly string[]
    location?: readonly InventoryLocationConditionId[]
    maxLevel?: number
    levelOp?: ComparisonOpId
    stolen?: "stolen" | "not-stolen"
    crafted?: "crafted" | "not-crafted"
    bound?: "bound" | "not-bound"
    bopTradeable?: "bop-tradeable" | "not-bop-tradeable"
    questRelevant?: "quest-relevant" | "not-quest-relevant"
    locked?: "locked" | "not-locked"
    reconstructed?: "reconstructed" | "not-reconstructed"
    transmuted?: "transmuted" | "not-transmuted"
    known?: "known" | "not-known"
    canInspire?: "can-inspire" | "cannot-inspire"
    canResearch?: "can-research" | "cannot-research"
    canUnlock?: "can-unlock" | "cannot-unlock"
    canOpen?: "can-open"
    canSell?: "can-sell"
    canListAtGuildTrader?: "can-list-at-guild-trader"
    canGiveMaxRewards?: "can-give-max-rewards"
    canCompanionEquip?: "can-companion-equip" | "cannot-companion-equip"
    isTargetEquip?: "is-target-equip" | "not-target-equip"
    isTargetCompanionEquip?: "is-target-companion-equip" | "not-target-companion-equip"
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
    keepFloor?: number
    itemNamePattern?: string
    requiredSkillLines?: RequiredSkillLinesCondition
    requiredCurseState?: RequiredCurseStateCondition
    canLevelMorphs?: CanLevelMorphsCondition
    stackFullness?: "full" | "partial"
    potionEffects?: readonly string[]
    potionEffectsMode?: "all" | "any"
  }
}

export type CharEligibility = Pick<
  NonNullable<CategoryRule["conditions"]>,
  "requiredSkillLines" | "canLevelMorphs"
>

export interface Tier {
  readonly destination: MoveToDestination
  readonly targetQuantity?: number
  readonly charEligibility?: CharEligibility
}

export type DestinationChain = readonly Tier[]

export interface ItemRule {
  id: string
  itemId: number
  itemName: string
  action: ItemAction
  active?: boolean
  locked?: boolean
  goal?: string | null
  title?: string | null
  notes?: string | null
  destination?: MoveToDestination
  stockQuantity?: number
  stockScope?: StockScope
  destinationChain?: DestinationChain
  updatedAt?: number
}

export interface InventoryRuleSettings {
  version: 2
  rules: readonly CategoryRule[]
  itemRules?: readonly ItemRule[]
  buyRules?: readonly BuyRule[]
}

export const IMPLICIT_TERMINAL_CATEGORY_RULE: Readonly<CategoryRule> = {
  id: IMPLICIT_TERMINAL_RULE_ID,
  categoryId: ALL_CATEGORIES_ID,
  action: "nothing",
  active: true,
  locked: true,
}
