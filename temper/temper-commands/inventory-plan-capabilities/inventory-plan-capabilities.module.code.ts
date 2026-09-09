import { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
import { parseInventoryContent } from "@akasha/temper-items-core/inventory-parser"
import { assertNever } from "@akasha/utils/narrow/assert-never"
import { computeAllRuleAffectedItems } from "akasha/temper/items-rules-matcher/inventory-rule-matcher/inventory-rule-matcher.module.code.ts"
import { buildManagementPlan } from "akasha/temper/temper-items-rules-routing/inventory-management-plan/inventory-management-plan.module.code.ts"
import {
  applyDestinationCapacityFilter,
  applyDestinationCapacityFilterWithAudit,
} from "akasha/temper/temper-items-rules-routing/inventory-management-plan-capacity-filter/inventory-management-plan-capacity-filter.module.code.ts"
import { formatPlanChecklist } from "akasha/temper/temper-items-rules-routing/inventory-plan-checklist/inventory-plan-checklist.module.code.ts"
import { loadTemperCharactersFromPath } from "../inventory-characters-reading/inventory-characters-reading.module.code.ts"
import {
  loadTemperInventoryConfigFromPath,
  parseTemperInventoryConfig,
} from "../inventory-config-reading/inventory-config-reading.module.code.ts"
import {
  buildMatcherContext,
  DEFAULT_CHARACTERS_PATH,
  DEFAULT_INVENTORY_PATH,
  loadInventoryPlanInputs,
} from "../inventory-plan-inputs/inventory-plan-inputs.module.code.ts"

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
