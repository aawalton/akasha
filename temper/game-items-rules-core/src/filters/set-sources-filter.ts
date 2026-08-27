import { setCategories } from "@temper/game-characters-equipment/sets/set-categories-data"
import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const SET_SOURCE_TYPE_ELIGIBLE_ROOTS = new Set(["equipment", "weapons", "armor", "jewelry"])

export const SET_SOURCE_TYPE_OPTIONS: FilterOption[] = setCategories.list
  .filter((c) => c.id !== "none")
  .sort((a, b) => a.displayOrder - b.displayOrder)
  .map((c) => ({ value: c.id, label: c.name }))

const read = (c: CategoryRule["conditions"]) =>
  c?.setSourceTypes && c.setSourceTypes.length > 0 ? c.setSourceTypes : undefined

export const setSourcesFilter: InventoryRuleFilter = {
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
