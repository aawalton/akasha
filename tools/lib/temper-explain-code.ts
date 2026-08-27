import { codeModule } from "./code-import.ts"
import * as cliEvalEnv from "./temper-inventory/cli-eval-env.ts"
import * as cliItemFacts from "./temper-inventory/cli-item-facts.ts"
import * as parseCharacters from "./temper-inventory/parse-temper-characters.ts"
import * as parseInventoryConfig from "./temper-inventory/parse-temper-inventory-config.ts"

const CLASSIFY = "@temper/game-items-core/classify-item-node-ids"
const INVENTORY_PARSER = "@temper/game-items-core/inventory-parser"
const ITEM_LINK_PARSER = "@temper/game-items-core/item-link-parser"
const LOCATION_CONDITION = "@temper/game-items-core/location-condition"
const STOCK_GROUPS = "@temper/game-items-rules-eval/compute-stock-groups"
const EVALUATOR = "@temper/game-items-rules-eval/evaluator"

export interface InventoryItemData {
  readonly itemId: number
  readonly itemName: string
  readonly itemLink: string
  readonly saleAvg?: number
  readonly minPrice?: number
  readonly amountCount?: number
  readonly saleAmountCount?: number
  readonly estimatedValue?: number
  readonly merchantValue?: number
  readonly replacementCost?: number
}

export interface InventoryLocationData {
  readonly lastScanned: number
  readonly bags: Readonly<Record<string, Readonly<Record<string, InventoryItemData>>>>
}

export interface InventoryDatabase {
  readonly locations: Readonly<Record<string, InventoryLocationData>>
}

export type LocationConditionId = string

export type ItemKey =
  | { readonly kind: "recipe"; readonly resultItemId: number }
  | { readonly kind: "motif"; readonly styleId: number; readonly chapterId: number | null }
  | { readonly kind: "script"; readonly scriptId: number }
  | { readonly kind: "consumable"; readonly itemId: number }

export interface ItemFacts {
  readonly categoryNodeIds?: ReadonlyArray<string>
  readonly itemKey?: ItemKey
  readonly itemType?: number
  readonly specializedItemType?: number
  readonly filterType?: number
  readonly traitType?: number
  readonly equipType?: number
  readonly armorType?: number
  readonly weaponType?: number
  readonly quality?: number
}

export type CompiledOrderedRule = Readonly<Record<string, unknown>>

export type EvalEnv = Readonly<Record<string, unknown>>

export type StockGroups = Readonly<Record<string, unknown>> | ReadonlyMap<string, unknown>

export interface CharacterKnowledge {
  readonly id: string
}

export type RejectionReason =
  | { readonly kind: "category-mismatch"; readonly ruleCategoryId: string }
  | { readonly kind: "condition-fail"; readonly conditionKind: string; readonly detail?: string }
  | { readonly kind: "destination-resolve-fail"; readonly detail?: string }
  | { readonly kind: "container-skip"; readonly detail?: string }

export type IndeterminateReason =
  | { readonly kind: "category-unknown"; readonly missingSignal: string }
  | {
      readonly kind: "condition-unknown"
      readonly conditionKind: string
      readonly missingSignal: string
    }
  | { readonly kind: "destination-unknown"; readonly detail?: string }

export type RuleVerdict =
  | { readonly kind: "matched" }
  | { readonly kind: "rejected"; readonly reason: RejectionReason }
  | { readonly kind: "indeterminate"; readonly reason: IndeterminateReason }

export interface RuleEvalResult {
  readonly index: number
  readonly ruleId?: string
  readonly categoryId: string
  readonly action: string
  readonly destination?: string
  readonly verdict: RuleVerdict
  readonly resolvedDestination?: string
}

export type WalkOutcome =
  | {
      readonly kind: "matched"
      readonly action: string
      readonly destination?: string
      readonly label: string
    }
  | { readonly kind: "implicit-terminal"; readonly action: string; readonly label: string }
  | {
      readonly kind: "indeterminate"
      readonly indeterminateRules: ReadonlyArray<RuleEvalResult>
      readonly provisionalMatch?: {
        readonly action: string
        readonly destination?: string
        readonly label: string
      }
    }

export interface WalkTrace {
  readonly perRule: ReadonlyArray<RuleEvalResult>
  readonly outcome: WalkOutcome
}

export interface CompiledInventoryConfig {
  readonly orderedRules: ReadonlyArray<CompiledOrderedRule>
  readonly wantedConsumables: Record<string, unknown>
  readonly characterPriority: ReadonlyArray<string>
}

export interface ResolvedInventoryItem {
  readonly item: InventoryItemData
  readonly location: LocationConditionId
}

export interface ExplainCapabilities {
  readonly parseItemLink: (input: string) => { readonly itemId: number } | null
  readonly parseInventoryContent: (content: string) => InventoryDatabase
  readonly classifyItemToNodeIds: (item: InventoryItemData) => ReadonlyArray<string>
  readonly locationConditionFromKeyAndBag: (key: string, bagId: number) => LocationConditionId
  readonly cliItemFactsFromInventoryItem: (
    item: InventoryItemData,
    nodeIds: ReadonlyArray<string>,
    location: LocationConditionId | undefined
  ) => ItemFacts
  readonly buildCliEvalEnv: (deps: {
    readonly charactersById: ReadonlyMap<string, CharacterKnowledge>
    readonly characterPriority: ReadonlyArray<string>
    readonly wantedConsumables: Record<string, unknown>
  }) => EvalEnv
  readonly computeStockGroups: (
    rules: ReadonlyArray<CompiledOrderedRule>,
    items: ReadonlyArray<ResolvedInventoryItem>,
    factsOf: (entry: ResolvedInventoryItem) => ItemFacts,
    env: EvalEnv
  ) => StockGroups
  readonly walkRules: (
    rules: ReadonlyArray<CompiledOrderedRule>,
    facts: ItemFacts,
    ctx: { readonly env: EvalEnv; readonly stockGroupByRuleId: StockGroups }
  ) => WalkTrace
  readonly loadTemperCharactersFromPath: (
    path: string
  ) => Promise<ReadonlyArray<CharacterKnowledge>>
  readonly loadTemperInventoryConfigFromPath: (path: string) => Promise<CompiledInventoryConfig>
}

export async function explainCapabilities(): Promise<ExplainCapabilities> {
  const facts = cliItemFacts as unknown as Pick<
    ExplainCapabilities,
    "cliItemFactsFromInventoryItem"
  >
  const env = cliEvalEnv as unknown as Pick<ExplainCapabilities, "buildCliEvalEnv">
  const characters = parseCharacters as unknown as Pick<
    ExplainCapabilities,
    "loadTemperCharactersFromPath"
  >
  const config = parseInventoryConfig as unknown as Pick<
    ExplainCapabilities,
    "loadTemperInventoryConfigFromPath"
  >
  const [links, parser, classify, location, groups, evaluator] = await Promise.all([
    codeModule<Pick<ExplainCapabilities, "parseItemLink">>(ITEM_LINK_PARSER),
    codeModule<Pick<ExplainCapabilities, "parseInventoryContent">>(INVENTORY_PARSER),
    codeModule<Pick<ExplainCapabilities, "classifyItemToNodeIds">>(CLASSIFY),
    codeModule<Pick<ExplainCapabilities, "locationConditionFromKeyAndBag">>(LOCATION_CONDITION),
    codeModule<Pick<ExplainCapabilities, "computeStockGroups">>(STOCK_GROUPS),
    codeModule<Pick<ExplainCapabilities, "walkRules">>(EVALUATOR),
  ])
  return {
    parseItemLink: links.parseItemLink,
    parseInventoryContent: parser.parseInventoryContent,
    classifyItemToNodeIds: classify.classifyItemToNodeIds,
    locationConditionFromKeyAndBag: location.locationConditionFromKeyAndBag,
    cliItemFactsFromInventoryItem: facts.cliItemFactsFromInventoryItem,
    buildCliEvalEnv: env.buildCliEvalEnv,
    computeStockGroups: groups.computeStockGroups,
    walkRules: evaluator.walkRules,
    loadTemperCharactersFromPath: characters.loadTemperCharactersFromPath,
    loadTemperInventoryConfigFromPath: config.loadTemperInventoryConfigFromPath,
  }
}

function findResolvedItemInLocation(
  caps: ExplainCapabilities,
  locationKey: string,
  location: InventoryLocationData,
  targetItemId: number
): ResolvedInventoryItem | undefined {
  for (const [bagId, bag] of Object.entries(location.bags)) {
    for (const item of Object.values(bag)) {
      if (item.itemId === targetItemId) {
        return {
          item,
          location: caps.locationConditionFromKeyAndBag(locationKey, Number(bagId)),
        }
      }
    }
  }
  return undefined
}

export function resolveItemFromInventory(
  caps: ExplainCapabilities,
  db: InventoryDatabase,
  targetItemId: number,
  charId?: string
): ResolvedInventoryItem | undefined {
  if (charId !== undefined) {
    const scoped = db.locations[charId]
    return scoped !== undefined
      ? findResolvedItemInLocation(caps, charId, scoped, targetItemId)
      : undefined
  }
  const sorted = Object.entries(db.locations).sort(([, a], [, b]) => b.lastScanned - a.lastScanned)
  for (const [locationKey, location] of sorted) {
    const found = findResolvedItemInLocation(caps, locationKey, location, targetItemId)
    if (found !== undefined) return found
  }
  return undefined
}

export function allBagItems(
  caps: ExplainCapabilities,
  db: InventoryDatabase
): ReadonlyArray<ResolvedInventoryItem> {
  const out: ResolvedInventoryItem[] = []
  for (const [locationKey, location] of Object.entries(db.locations)) {
    for (const [bagId, bag] of Object.entries(location.bags)) {
      const resolvedLocation = caps.locationConditionFromKeyAndBag(locationKey, Number(bagId))
      for (const item of Object.values(bag)) {
        out.push({ item, location: resolvedLocation })
      }
    }
  }
  return out
}
