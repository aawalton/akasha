import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const POTION_EFFECTS_ELIGIBLE_ROOTS = new Set(["potions"])

export const POTION_EFFECTS_OPTIONS: FilterOption[] = [
  { value: "health-restore", label: "Restores Health" },
  { value: "magicka-restore", label: "Restores Magicka" },
  { value: "stamina-restore", label: "Restores Stamina" },
]

const read = (c: CategoryRule["conditions"]) => c?.potionEffects
const readMode = (c: CategoryRule["conditions"]) => c?.potionEffectsMode

export const potionEffectsFilter: InventoryRuleFilter = {
  id: "potion-effects",
  label: "Potion Effects",
  priority: 1,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, POTION_EFFECTS_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => (read(c)?.length ?? 0) > 0,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined || v.length === 0) return undefined
    const mode = readMode(c) ?? "any"
    return `${mode}:${[...v].sort().join(",")}`
  },
  applyDefault: () => ({}),
  clear: () => ({ potionEffects: undefined, potionEffectsMode: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    if (v === undefined) return {}
    const mode = readMode(c)
    return mode !== undefined ? { potionEffects: v, potionEffectsMode: mode } : { potionEffects: v }
  },
}
