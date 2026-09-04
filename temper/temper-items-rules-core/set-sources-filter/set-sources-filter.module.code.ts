import { setCategories } from "@akasha/temper-characters-equipment/set-categories"
import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const SET_SOURCE_TYPE_ELIGIBLE_ROOTS = new Set(["equipment", "weapons", "armor", "jewelry"])

export const SET_SOURCE_TYPE_OPTIONS: FilterOption[] = setCategories.list
  .filter((c) => c.id !== "none")
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map((c) => ({ value: c.id, label: c.name }))

const read = (c: CategoryRule["conditions"]) =>
  c?.setSourceTypes && c.setSourceTypes.length > 0 ? c.setSourceTypes : undefined

export const SET_SOURCES_FILTER: InventoryRuleFilter = {
  id: "set-sources",
  label: "Set Sources",
  priority: 4,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, SET_SOURCE_TYPE_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? [...v].sort().join(",") : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ setSourceTypes: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { setSourceTypes: v } : {}
  },
}
