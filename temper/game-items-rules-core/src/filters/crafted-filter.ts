import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const CRAFTED_ELIGIBLE_ROOTS = new Set([
  "equipment",
  "consumables",
  "potions",
  "poisons",
  "glyphs",
  "food",
  "drink",
  "furnishings",
])

export const CRAFTED_OPTIONS: FilterOption[] = [
  { value: "crafted", label: "Is Crafted" },
  { value: "not-crafted", label: "Is Not Crafted" },
]

const read = (c: CategoryRule["conditions"]) => c?.crafted

export const craftedFilter: InventoryRuleFilter = {
  id: "crafted",
  label: "Crafted Status",
  priority: 2,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CRAFTED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: ["stolen"],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ crafted: "crafted" }),
  clear: () => ({ crafted: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { crafted: v } : {}
  },
}
