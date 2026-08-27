import { assertNever } from "@shared/utils-narrow"
import { classifyItemToNodeIds } from "@temper/game-items-core/classify-item-node-ids"
import { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import { computeAllRuleAffectedItems } from "@temper/game-items-rules-matcher/inventory-rule-matcher"
import { buildManagementPlan } from "@temper/game-items-rules-routing/inventory-management-plan"
import {
  applyDestinationCapacityFilter,
  applyDestinationCapacityFilterWithAudit,
  type CapacityAudit,
  type CapacityAuditEntry,
} from "@temper/game-items-rules-routing/inventory-management-plan-capacity-filter"
import { formatPlanChecklist } from "@temper/game-items-rules-routing/inventory-plan-checklist"
import type {
  CharacterSession,
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import {
  buildMatcherContext,
  DEFAULT_CHARACTERS_PATH,
  DEFAULT_INVENTORY_PATH,
  type InventoryPlanInputs,
  loadInventoryPlanInputs,
} from "./temper-inventory/inventory-plan-inputs.ts"
import {
  type CharacterKnowledge,
  loadTemperCharactersFromPath,
} from "./temper-inventory/parse-temper-characters.ts"
import {
  type CompiledInventoryConfig,
  loadTemperInventoryConfigFromPath,
  parseTemperInventoryConfig,
} from "./temper-inventory/parse-temper-inventory-config.ts"

export type {
  CapacityAudit,
  CapacityAuditEntry,
  CharacterKnowledge,
  CharacterSession,
  ClassifiedInventoryItem,
  CompiledInventoryConfig,
  CompiledOrderedRule,
  InventoryDatabase,
  InventoryPlanInputs,
  ManagementPlan,
  PlanItem,
  RuleMatcherContext,
  VenueStop,
}

interface PlanInputsModule {
  readonly DEFAULT_INVENTORY_PATH: typeof DEFAULT_INVENTORY_PATH
  readonly DEFAULT_CHARACTERS_PATH: typeof DEFAULT_CHARACTERS_PATH
  readonly loadInventoryPlanInputs: typeof loadInventoryPlanInputs
  readonly buildMatcherContext: typeof buildMatcherContext
}

interface Matcher {
  readonly computeAllRuleAffectedItems: typeof computeAllRuleAffectedItems
}

interface CapacityFilter {
  readonly applyDestinationCapacityFilter: typeof applyDestinationCapacityFilter
  readonly applyDestinationCapacityFilterWithAudit: typeof applyDestinationCapacityFilterWithAudit
}

interface ManagementPlanModule {
  readonly buildManagementPlan: typeof buildManagementPlan
}

interface PlanChecklist {
  readonly formatPlanChecklist: typeof formatPlanChecklist
}

interface ClassifyItem {
  readonly classifyItemToNodeIds: typeof classifyItemToNodeIds
}

interface InventoryParser {
  readonly parseInventoryContent: typeof parseInventoryContent
}

interface ParseCharacters {
  readonly loadTemperCharactersFromPath: typeof loadTemperCharactersFromPath
}

interface ParseConfig {
  readonly parseTemperInventoryConfig: typeof parseTemperInventoryConfig
  readonly loadTemperInventoryConfigFromPath: typeof loadTemperInventoryConfigFromPath
}

interface UtilsNarrow {
  readonly assertNever: typeof assertNever
}

export function planInputs(): Promise<PlanInputsModule> {
  return Promise.resolve({
    DEFAULT_INVENTORY_PATH,
    DEFAULT_CHARACTERS_PATH,
    loadInventoryPlanInputs,
    buildMatcherContext,
  })
}

export function ruleMatcher(): Promise<Matcher> {
  return Promise.resolve({ computeAllRuleAffectedItems })
}

export function capacityFilter(): Promise<CapacityFilter> {
  return Promise.resolve({
    applyDestinationCapacityFilter,
    applyDestinationCapacityFilterWithAudit,
  })
}

export function managementPlan(): Promise<ManagementPlanModule> {
  return Promise.resolve({ buildManagementPlan })
}

export function planChecklist(): Promise<PlanChecklist> {
  return Promise.resolve({ formatPlanChecklist })
}

export function classifyItem(): Promise<ClassifyItem> {
  return Promise.resolve({ classifyItemToNodeIds })
}

export function inventoryParser(): Promise<InventoryParser> {
  return Promise.resolve({ parseInventoryContent })
}

export function parseCharacters(): Promise<ParseCharacters> {
  return Promise.resolve({ loadTemperCharactersFromPath })
}

export function parseConfig(): Promise<ParseConfig> {
  return Promise.resolve({ parseTemperInventoryConfig, loadTemperInventoryConfigFromPath })
}

export function utilsNarrow(): Promise<UtilsNarrow> {
  return Promise.resolve({ assertNever })
}
