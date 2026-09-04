import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export interface FilterOption {
  value: string
  label: string
}

export type FilterId =
  | "quality"
  | "traits"
  | "location"
  | "level"
  | "stolen"
  | "crafted"
  | "set-sources"
  | "bound"
  | "bop-tradeable"
  | "quest-relevant"
  | "locked"
  | "reconstructed"
  | "transmuted"
  | "known"
  | "can-inspire"
  | "can-research"
  | "can-unlock"
  | "can-open"
  | "can-sell"
  | "can-list-at-guild-trader"
  | "can-give-max-rewards"
  | "can-companion-equip"
  | "needed-for-target-character-build"
  | "needed-for-target-companion-build"
  | "all-stocked"
  | "stock-threshold"
  | "value"
  | "market-value"
  | "merchant-value"
  | "replacement-value"
  | "keep-quantity"
  | "target-quantity"
  | "item-name"
  | "required-skill-lines"
  | "required-curse-state"
  | "can-level-morphs"
  | "stack-fullness"
  | "potion-effects"

export type ConditionsPatch = Partial<NonNullable<CategoryRule["conditions"]>>

export interface InventoryRuleFilter {
  id: FilterId
  label: string
  priority: number
  isEligible: (categoryId: string, categories: Record<string, ItemCategoryNode>) => boolean
  mutuallyExclusive: readonly FilterId[]
  isEligibleForAction?: (action: ItemAction) => boolean

  isPresent: (conditions: CategoryRule["conditions"]) => boolean

  fingerprint: (conditions: CategoryRule["conditions"]) => string | undefined

  applyDefault: () => ConditionsPatch

  clear: () => ConditionsPatch

  transferToCategory: (
    conditions: CategoryRule["conditions"],
    prevCategoryId: string,
    nextCategoryId: string,
    categories: Record<string, ItemCategoryNode>
  ) => ConditionsPatch
}
