import * as utilsNarrowModule from "@shared/utils-narrow"
import { codeModule } from "./code-import.ts"
import * as planInputsModule from "./temper-inventory/inventory-plan-inputs.ts"
import * as parseCharactersModule from "./temper-inventory/parse-temper-characters.ts"
import * as parseConfigModule from "./temper-inventory/parse-temper-inventory-config.ts"

const MATCHER = "@temper/game-items-rules-matcher/inventory-rule-matcher"
const CAPACITY_FILTER =
  "@temper/game-items-rules-routing/inventory-management-plan-capacity-filter"
const MANAGEMENT_PLAN = "@temper/game-items-rules-routing/inventory-management-plan"
const PLAN_CHECKLIST = "@temper/game-items-rules-routing/inventory-plan-checklist"
const CLASSIFY_ITEM = "@temper/game-items-core/classify-item-node-ids"
const INVENTORY_PARSER = "@temper/game-items-core/inventory-parser"

export type InventoryDatabase = object

export type CompiledOrderedRule = Readonly<Record<string, unknown>> & {
  readonly categoryId?: string
}

export type ClassifiedInventoryItem = Readonly<Record<string, unknown>>

export type RuleMatcherContext = object

export interface CharacterKnowledge {
  readonly id: string
}

export interface CompiledInventoryConfig {
  readonly orderedRules: readonly CompiledOrderedRule[]
  readonly rules: readonly { readonly id?: string }[]
  readonly characterPriority: unknown
  readonly wantedConsumables: unknown
}

export interface InventoryPlanInputs {
  readonly db: InventoryDatabase
  readonly orderedRules: readonly CompiledOrderedRule[]
  readonly itemRules: readonly unknown[]
  readonly context: RuleMatcherContext
  readonly classifiedItems: readonly ClassifiedInventoryItem[]
}

export interface CapacityAuditEntry {
  readonly destinationName: string
  readonly neededSlots: number
  readonly freeSlots: number
  readonly droppedStacks: number
  readonly droppedUnits: number
  readonly rules: readonly {
    readonly ruleId: string
    readonly ruleTitle?: string
    readonly action: string
    readonly items: readonly { readonly itemName: string; readonly units: number }[]
  }[]
}

export interface CapacityAudit {
  readonly entries: readonly CapacityAuditEntry[]
}

export interface PlanItem {
  readonly action: string
  readonly stackCount: number
}

export interface VenueStop {
  readonly label: string
  readonly actionGroups: readonly { readonly items: readonly PlanItem[] }[]
}

export interface CharacterSession {
  readonly venues: readonly VenueStop[]
}

export interface ManagementPlan {
  readonly sessions: readonly CharacterSession[]
}

interface PlanInputsModule {
  readonly DEFAULT_INVENTORY_PATH: string
  readonly DEFAULT_CHARACTERS_PATH: string
  readonly loadInventoryPlanInputs: (
    inventoryPath: string,
    charactersPath: string
  ) => Promise<InventoryPlanInputs>
  readonly buildMatcherContext: (
    config: CompiledInventoryConfig,
    charactersById: ReadonlyMap<string, CharacterKnowledge>,
    db: InventoryDatabase
  ) => RuleMatcherContext
}

interface Matcher {
  readonly computeAllRuleAffectedItems: (
    orderedRules: readonly CompiledOrderedRule[],
    classifiedItems: readonly ClassifiedInventoryItem[],
    context: RuleMatcherContext,
    itemRules: readonly unknown[]
  ) => { readonly ruleMap: unknown }
}

interface CapacityFilter {
  readonly applyDestinationCapacityFilter: (
    orderedRules: readonly CompiledOrderedRule[],
    itemRules: readonly unknown[],
    ruleMap: unknown,
    db: InventoryDatabase
  ) => unknown
  readonly applyDestinationCapacityFilterWithAudit: (
    orderedRules: readonly CompiledOrderedRule[],
    itemRules: readonly unknown[],
    ruleMap: unknown,
    db: InventoryDatabase
  ) => { readonly audit: CapacityAudit }
}

interface ManagementPlanModule {
  readonly buildManagementPlan: (
    orderedRules: readonly CompiledOrderedRule[],
    itemRules: readonly unknown[],
    filtered: unknown,
    db: InventoryDatabase,
    context: RuleMatcherContext
  ) => ManagementPlan
}

interface PlanChecklist {
  readonly formatPlanChecklist: (plan: ManagementPlan) => string
}

interface ClassifyItem {
  readonly classifyItemToNodeIds: (item: unknown) => readonly string[]
}

interface InventoryParser {
  readonly parseInventoryContent: (content: string) => InventoryDatabase
}

interface ParseCharacters {
  readonly loadTemperCharactersFromPath: (path: string) => Promise<readonly CharacterKnowledge[]>
}

interface ParseConfig {
  readonly parseTemperInventoryConfig: (content: string) => CompiledInventoryConfig
  readonly loadTemperInventoryConfigFromPath: (path: string) => Promise<CompiledInventoryConfig>
}

interface UtilsNarrow {
  readonly assertNever: (value: never) => never
}

export function planInputs(): Promise<PlanInputsModule> {
  return Promise.resolve(planInputsModule as unknown as PlanInputsModule)
}

export function ruleMatcher(): Promise<Matcher> {
  return codeModule<Matcher>(MATCHER)
}

export function capacityFilter(): Promise<CapacityFilter> {
  return codeModule<CapacityFilter>(CAPACITY_FILTER)
}

export function managementPlan(): Promise<ManagementPlanModule> {
  return codeModule<ManagementPlanModule>(MANAGEMENT_PLAN)
}

export function planChecklist(): Promise<PlanChecklist> {
  return codeModule<PlanChecklist>(PLAN_CHECKLIST)
}

export function classifyItem(): Promise<ClassifyItem> {
  return codeModule<ClassifyItem>(CLASSIFY_ITEM)
}

export function inventoryParser(): Promise<InventoryParser> {
  return codeModule<InventoryParser>(INVENTORY_PARSER)
}

export function parseCharacters(): Promise<ParseCharacters> {
  return Promise.resolve(parseCharactersModule as unknown as ParseCharacters)
}

export function parseConfig(): Promise<ParseConfig> {
  return Promise.resolve(parseConfigModule as unknown as ParseConfig)
}

export function utilsNarrow(): Promise<UtilsNarrow> {
  return Promise.resolve(utilsNarrowModule as unknown as UtilsNarrow)
}
