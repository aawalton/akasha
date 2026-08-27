import { codeModuleSync } from "../code-import.ts"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationConditionId,
  ItemFacts,
  ItemKey,
  LoreCategoryEntry,
  MotifBookId,
  RouteStep,
} from "./game-item-types.ts"
import type {
  AffectedItem,
  InventoryRuleSettings,
  ItemAction,
  MoveToDestination,
  RuleConstantKey,
} from "./game-rule-types.ts"

const RULES_CORE = "@temper/game-items-rules-core/rule-constants"
const RULE_TYPES = "@temper/game-items-rules-core/inventory-rule-types"
const RULE_SETTINGS = "@temper/game-items-rules-core/inventory-rule-settings"
const DESTINATION_PARSE = "@temper/game-items-rules-core/inventory-destination-parse"
const ITEM_FACTS_BUILD = "@temper/game-items-rules-eval/build-item-facts-from-inventory-item"
const ROUTING_CORE = "@temper/game-items-rules-routing-core/inventory-management-plan-route"
const CLASSIFY = "@temper/game-items-core/classify-item-node-ids"
const INVENTORY_PARSER = "@temper/game-items-core/inventory-parser"
const MOTIF_CHAPTER_SET = "@temper/game-items-core/motif-chapter-set"
const MOTIF_NAME_PARSER = "@temper/game-items-core/motif-name-parser"
const LORE_LIBRARY = "@temper/game-completion/generated/lore-library-data.generated"

function once<T>(load: () => T): () => T {
  let held: T | undefined
  return () => {
    if (held === undefined) held = load()
    return held
  }
}

interface RulesCore {
  readonly RULE_CONSTANT_KEYS: readonly RuleConstantKey[]
}

interface RuleTypes {
  readonly ITEM_ACTION_VALUES: readonly ItemAction[]
}

interface RuleSettings {
  readonly createDefaultRuleSettings: () => InventoryRuleSettings
}

interface DestinationParse {
  readonly narrowDestination: (value: string) => MoveToDestination
  readonly parseItemAction: (value: string | undefined) => ItemAction | undefined
}

interface ItemFactsBuild {
  readonly buildItemFactsFromInventoryItem: (input: {
    readonly item: InventoryItemData
    readonly nodeIds: ReadonlyArray<string>
    readonly location: InventoryLocationConditionId | undefined
    readonly itemKey: ItemKey | undefined
  }) => ItemFacts
  readonly resolveStaticItemKey: (item: InventoryItemData) => ItemKey | undefined
}

interface RoutingCore {
  readonly resolveItemRoute: (
    entry: AffectedItem,
    action: ItemAction,
    destination: MoveToDestination | undefined,
    claimed: null
  ) => readonly RouteStep[]
}

interface Classify {
  readonly classifyItemToNodeIds: (item: InventoryItemData) => readonly string[]
}

interface InventoryParser {
  readonly parseInventoryContent: (content: string) => InventoryDatabase
}

interface MotifChapterSet {
  readonly STYLE_TO_CHAPTERS: Record<number, readonly number[] | undefined>
}

interface MotifNameParser {
  readonly parseMotifBookName: (cleanName: string) => MotifBookId | undefined
}

interface LoreLibrary {
  readonly loreLibraryData: readonly LoreCategoryEntry[]
}

const rulesCore = once(() => codeModuleSync<RulesCore>(RULES_CORE))
const ruleTypes = once(() => codeModuleSync<RuleTypes>(RULE_TYPES))
const ruleSettings = once(() => codeModuleSync<RuleSettings>(RULE_SETTINGS))
const destinationParse = once(() => codeModuleSync<DestinationParse>(DESTINATION_PARSE))
const itemFactsBuild = once(() => codeModuleSync<ItemFactsBuild>(ITEM_FACTS_BUILD))
const routingCore = once(() => codeModuleSync<RoutingCore>(ROUTING_CORE))
const classify = once(() => codeModuleSync<Classify>(CLASSIFY))
const inventoryParser = once(() => codeModuleSync<InventoryParser>(INVENTORY_PARSER))
const motifChapterSet = once(() => codeModuleSync<MotifChapterSet>(MOTIF_CHAPTER_SET))
const motifNameParser = once(() => codeModuleSync<MotifNameParser>(MOTIF_NAME_PARSER))
const loreLibrary = once(() => codeModuleSync<LoreLibrary>(LORE_LIBRARY))

export function ruleConstantKeys(): readonly [RuleConstantKey, ...RuleConstantKey[]] {
  const keys = rulesCore().RULE_CONSTANT_KEYS
  return keys as unknown as readonly [RuleConstantKey, ...RuleConstantKey[]]
}

export function itemActionValues(): readonly ItemAction[] {
  return ruleTypes().ITEM_ACTION_VALUES
}

export function createDefaultRuleSettings(): InventoryRuleSettings {
  return ruleSettings().createDefaultRuleSettings()
}

export function narrowDestination(value: string): MoveToDestination {
  return destinationParse().narrowDestination(value)
}

export function parseItemAction(value: string | undefined): ItemAction | undefined {
  return destinationParse().parseItemAction(value)
}

export function buildItemFactsFromInventoryItem(input: {
  readonly item: InventoryItemData
  readonly nodeIds: ReadonlyArray<string>
  readonly location: InventoryLocationConditionId | undefined
  readonly itemKey: ItemKey | undefined
}): ItemFacts {
  return itemFactsBuild().buildItemFactsFromInventoryItem(input)
}

export function resolveStaticItemKey(item: InventoryItemData): ItemKey | undefined {
  return itemFactsBuild().resolveStaticItemKey(item)
}

export function resolveItemRoute(
  entry: AffectedItem,
  action: ItemAction,
  destination: MoveToDestination | undefined,
  claimed: null
): readonly RouteStep[] {
  return routingCore().resolveItemRoute(entry, action, destination, claimed)
}

export function classifyItemToNodeIds(item: InventoryItemData): readonly string[] {
  return classify().classifyItemToNodeIds(item)
}

export function parseInventoryContent(content: string): InventoryDatabase {
  return inventoryParser().parseInventoryContent(content)
}

export function styleToChapters(styleId: number): readonly number[] | undefined {
  return motifChapterSet().STYLE_TO_CHAPTERS[styleId]
}

export function parseMotifBookName(cleanName: string): MotifBookId | undefined {
  return motifNameParser().parseMotifBookName(cleanName)
}

export function loreLibraryData(): readonly LoreCategoryEntry[] {
  return loreLibrary().loreLibraryData
}
