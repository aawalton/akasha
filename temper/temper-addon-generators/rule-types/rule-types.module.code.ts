export function generateRuleTypes(): string {
  return `\
/**
 * Rule Types (Generated)
 *
 * Shared type definitions and constants for the inventory rules system.
 * Source: engine/inventory/inventory-rule-compiler-types.ts,
 *         engine/inventory/inventory-rule-types.ts,
 *         engine/inventory/filters/comparison-op-data.ts,
 *         engine/inventory/filters/comparison-op.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

// \`destinationChain\` is the SINGLE source-of-truth type from rules-core — both
// the web routing layer and the addon read \`CompiledOrderedRule.destinationChain\`
// as the identical \`DestinationChain\`, so the shared \`planStockDestinationsForChain\`
// decider sees one shape on both sides (#11895). Type-only import erases under TSTL.
import type { DestinationChain } from "@temper/game-items-rules-core/inventory-rule-types"

// =========================================================================
// Scope types
// =========================================================================

/** Scope for cross-character condition checks — derived from rule destination by the compiler. */
export type CharacterScope = "current-character" | "any-character" | \`character:\${string}\`

/** Scope for cross-companion condition checks (target companion equip). */
export type CompanionScope = "active-companion" | "any-companion"

/** Scope for stock action — determines where the target quantity is enforced. */
export type StockScope = "current-character" | "any-character"

// =========================================================================
// Comparison operators
// =========================================================================

export type ComparisonOp = "<=" | "<" | ">=" | ">" | "=" | "!="

export function compareWithOp(op: ComparisonOp, a: number, b: number): boolean {
  if (op === "<=") return a <= b
  if (op === "<") return a < b
  if (op === ">=") return a >= b
  if (op === ">") return a > b
  if (op === "=") return a === b
  if (op === "!=") return a !== b
  return a <= b
}

// =========================================================================
// Constants
// =========================================================================

/** Virtual root above the 8 L0 categories — matches all items. */
export const ALL_CATEGORIES_ID = "all"

// =========================================================================
// Item actions
// =========================================================================

export type ItemAction =
  | "nothing"
  | "lock"
  | "unlock"
  | "move-to"
  | "stock"
  | "character-equip"
  | "companion-equip"
  | "deconstruct"
  | "refine"
  | "destroy"
  | "fence-launder"
  | "fence-sell"
  | "list"
  | "mail"
  | "research"
  | "sell"
  | "use"
  | "open"

export function isMoveLikeAction(action: ItemAction): boolean {
  return (
    action === "move-to" ||
    action === "stock" ||
    action === "character-equip" ||
    action === "companion-equip"
  )
}

// =========================================================================
// Compiled rule interfaces
// =========================================================================

export interface ResolvedEntry {
  action: ItemAction
  destination?: string
  maxQuality?: number
  qualityOp?: ComparisonOp
  maxLevel?: number
  levelOp?: ComparisonOp
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
  value?: number
  valueOp?: ComparisonOp
  marketValue?: number
  marketValueOp?: ComparisonOp
  merchantValue?: number
  merchantValueOp?: ComparisonOp
  replacementValue?: number
  replacementValueOp?: ComparisonOp
  keepQuantity?: number
  targetQuantity?: number
  stockScope?: StockScope
  itemNamePattern?: string
}

/** Wanted equipment signature — describes a single player equipment slot from a target build. */
export interface WantedEquipmentSignature {
  esoCharId: string
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
}

/** Wanted companion equipment signature — describes a single companion equipment slot from a target build. */
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

/** Buy source venue — the acquisition channel for a buy rule. */
export type BuySource = "merchant"

/** Compiled buy rule — the global acquisition target for an itemId and its source venue. */
export interface CompiledBuyRule {
  targetQuantity: number
  source: BuySource
}

/** A single rule in the priority-ordered evaluation list. Extends ResolvedEntry with category and all condition fields. */
export interface CompiledOrderedRule extends ResolvedEntry {
  /**
   * Stable rule id, propagated from the authoring \`CategoryRule.id\` by
   * \`compileCategoryRuleToOrdered\`. Keys the aggregate stock group
   * (\`EvalContext.stockGroupByRuleId\`) so \`checkStock\` sums a character's
   * holdings across every itemId this rule matches (#11910). Optional because
   * synthetic / item-derived ordered rules need no group (they degrade to the
   * single-itemId fallback).
   */
  id?: string
  categoryId: string
  stolen?: "stolen" | "not-stolen"
  crafted?: "crafted" | "not-crafted"
  reconstructed?: "reconstructed" | "not-reconstructed"
  transmuted?: "transmuted" | "not-transmuted"
  canOpen?: "can-open"
  canGiveMaxRewards?: "can-give-max-rewards"
  traits?: readonly string[]
  location?: readonly ("worn" | "backpack" | "bank" | "craftbag" | "housing-storage" | "house" | "companion" | "guild")[]
  /**
   * Cascading stock destination chain (\`stock\` action only). Resolved by the
   * shared \`planStockDestinationsForChain\` on BOTH the web routing layer and the
   * addon (#11895). The addon's \`computeStockAllocationForChain\` reads this to
   * drive per-character bank-source distribution.
   */
  destinationChain?: DestinationChain
  /**
   * Potion restoration-effect gate. Restore metric ids
   * (\`health-restore\` / \`magicka-restore\` / \`stamina-restore\`) matched against
   * the potion's catalog-resolved restore effects. \`potionEffectsMode\`
   * (default \`any\`) selects the predicate: \`any\` = grants at least one listed
   * effect; \`all\` = grants every listed effect.
   */
  potionEffects?: readonly string[]
  potionEffectsMode?: "all" | "any"
}

export interface CompiledRuleConfig {
  version: 3
  orderedRules: readonly CompiledOrderedRule[]
  itemRules: Record<number, ResolvedEntry>
  /** Wanted equipment signatures from character target builds */
  wantedEquipment: readonly WantedEquipmentSignature[]
  /** Wanted companion equipment signatures from companion target builds */
  wantedCompanionEquipment: readonly WantedCompanionEquipmentSignature[]
  /** itemId -> array of ESO character IDs that want this consumable in their target build */
  wantedConsumables: Record<number, string[]>
  /** itemId -> charId -> count of this consumable in that character's inventory */
  consumableStock: Record<number, Record<string, number>>
  /** ESO character IDs in sort_order priority — used by addon for cross-character research routing */
  characterPriority?: readonly string[]
  /** Currency transfer rules — keyed by currency string key (e.g. "gold", "alliancePoints") */
  currencyRules?: Record<string, CompiledCurrencyRule>
  /** Buy acquisition rules — keyed by itemId, present only when there are active buy rules. */
  buyRules?: Record<number, CompiledBuyRule>
  /**
   * Whether the export could actually read an inventory snapshot. The two stock
   * records below cannot carry this: "the player holds none of these" and "we
   * could not find out" are both the empty record, and only one of them may
   * authorise a purchase. Present only when there are active buy rules; the addon
   * requires an explicit \`true\` before buying.
   */
  buyStockAvailable?: boolean
  /** Per-character backpack snapshot for buy-rule itemIds — itemId -> charId(string) -> backpack count. Present only when there are active buy rules. */
  buyStockByChar?: Record<number, Record<string, number>>
  /** Account-wide storage snapshot for buy-rule itemIds — itemId -> summed count across Bank + CraftBag + house. Present only when there are active buy rules. */
  buyStockAccount?: Record<number, number>
}
`
}
