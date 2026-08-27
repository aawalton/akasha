import type {
  CharacterId,
  InventoryItemData,
  InventoryLocationConditionId,
} from "./game-item-types.ts"

export type ComparisonOpId = string

export type RuleConstantKey = "MIN_LISTING_VALUE"

export type CompanionScope = "active-companion" | "any-companion"

export type StockScope = "current-character" | "any-character"

export type CharacterScope = "current-character" | "any-character" | `character:${string}`

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

export type BuySource = "merchant"

export interface RequiredSkillLinesCondition {
  readonly skillLineIds: readonly string[]
  readonly mode: "all-maxed" | "any-not-maxed"
}

export interface RequiredCurseStateCondition {
  readonly state: "vampire" | "werewolf"
}

export interface CanLevelMorphsCondition {
  readonly mode: "can-level"
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

export interface BuyRule {
  id: string
  itemId: number
  itemName: string
  targetQuantity: number
  source: BuySource
  active?: boolean
  locked?: boolean
  goal?: string | null
  title?: string | null
  notes?: string | null
  updatedAt?: number
}

export interface InventoryRuleSettings {
  version: 2
  rules: readonly CategoryRule[]
  itemRules?: readonly ItemRule[]
  buyRules?: readonly BuyRule[]
}

export interface AffectedItem {
  item: InventoryItemData
  locationKey: string
  locationDisplayName: string
  bagId: number
  alreadyAtDestination: boolean
  quantity?: number
  useAllocation?: readonly CharacterId[]
}

export interface ClassifiedInventoryItem {
  item: InventoryItemData
  locationKey: string
  locationDisplayName: string
  nodeIds: readonly string[]
  bagId: number
}

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

export interface RuleMatcherContext {
  wantedEquipment: readonly WantedEquipmentSignature[]
  wantedCompanionEquipment: readonly WantedCompanionEquipmentSignature[]
  wantedConsumables: Map<number, string[]>
  consumableStock: Map<number, Map<string, number>>
  bankStock: Map<number, number>
  characterLevels: Map<string, number>
  knownRecipesByCharacter: Map<string, Set<number>>
  knownMotifsByCharacter: Map<string, Map<number, Set<number>>>
  knownMotifsByStyleIdByCharacter: Map<string, Map<number, Set<number>>>
  knownScriptsByCharacter: Map<string, Set<number>>
  researchedTraitsByCharacter: Map<string, Map<number, Map<string, boolean>>>
  characterPriority: readonly string[]
  craftingLevels: Map<string, Map<number, number>>
  openCooldowns: Map<string, number>
  transmuteCrystalCap: number | undefined
  transmuteCrystalAmount: number | undefined
  getCharacterSkillLineRanks?: (
    this: void,
    charId: string,
    skillLineId: string
  ) => { currentRank: number; maxRank: number } | undefined
  getCharacterCurseState?: (this: void, charId: string) => "vampire" | "werewolf" | undefined
  getCharacterCanLevelMorphs?: (this: void, charId: string) => boolean
}
