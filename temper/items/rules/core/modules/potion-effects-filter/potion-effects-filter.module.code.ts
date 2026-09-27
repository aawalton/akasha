import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"
import { healthRestore } from "akasha/temper/player/character/stat/temper-metric/pages/health-restore/health-restore.temper-metric.ts"
import { magickaRestore } from "akasha/temper/player/character/stat/temper-metric/pages/magicka-restore/magicka-restore.temper-metric.ts"
import { staminaRestore } from "akasha/temper/player/character/stat/temper-metric/pages/stamina-restore/stamina-restore.temper-metric.ts"

const POTION_EFFECTS_ELIGIBLE_ROOTS = new Set(["potions"])

export const POTION_EFFECTS_OPTIONS: FilterOption[] = [
  { value: healthRestore.slug, label: healthRestore.title },
  { value: magickaRestore.slug, label: magickaRestore.title },
  { value: staminaRestore.slug, label: staminaRestore.title },
]

const read = (c: CategoryRule["conditions"]) => c?.potionEffects
const readMode = (c: CategoryRule["conditions"]) => c?.potionEffectsMode

export const POTION_EFFECTS_FILTER: InventoryRuleFilter = {
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
