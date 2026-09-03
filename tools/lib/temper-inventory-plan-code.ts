import {
  type CharacterKnowledge,
  loadTemperCharactersFromPath,
} from "@akasha/temper-commands/inventory-characters-reading"
import {
  type CompiledInventoryConfig,
  loadTemperInventoryConfigFromPath,
  parseTemperInventoryConfig,
} from "@akasha/temper-commands/inventory-config-reading"
import {
  buildMatcherContext,
  DEFAULT_CHARACTERS_PATH,
  DEFAULT_INVENTORY_PATH,
  type InventoryPlanInputs,
  loadInventoryPlanInputs,
} from "@akasha/temper-commands/inventory-plan-inputs"
import { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
import { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { ClassifiableItem } from "@akasha/temper-items-core/item-category-tree-types"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { computeAllRuleAffectedItems } from "@akasha/temper-items-rules-matcher/inventory-rule-matcher"
import { buildManagementPlan } from "@akasha/temper-items-rules-routing/inventory-management-plan"
import {
  applyDestinationCapacityFilter,
  applyDestinationCapacityFilterWithAudit,
  type CapacityAudit,
  type CapacityAuditEntry,
} from "@akasha/temper-items-rules-routing/inventory-management-plan-capacity-filter"
import { formatPlanChecklist } from "@akasha/temper-items-rules-routing/inventory-plan-checklist"
import type {
  CharacterSession,
  ManagementPlan,
  PlanItem,
  VenueStop,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"

export type {
  CapacityAudit,
  CapacityAuditEntry,
  CharacterKnowledge,
  CharacterSession,
  ClassifiableItem,
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
