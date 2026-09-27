import { runChecker } from "akasha/temper/items/filters/core/modules/search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterEditorOption } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"
import { checkPotionEffects } from "akasha/temper/items/rules/eval/modules/check-potion-effects/check-potion-effects.module.code.ts"
import { healthRestore } from "akasha/temper/player/character/stat/temper-metric/pages/health-restore/health-restore.temper-metric.ts"
import { magickaRestore } from "akasha/temper/player/character/stat/temper-metric/pages/magicka-restore/magicka-restore.temper-metric.ts"
import { staminaRestore } from "akasha/temper/player/character/stat/temper-metric/pages/stamina-restore/stamina-restore.temper-metric.ts"

const POTION_EFFECT_OPTIONS: readonly FilterEditorOption[] = [
  { value: healthRestore.slug, label: healthRestore.title },
  { value: magickaRestore.slug, label: magickaRestore.title },
  { value: staminaRestore.slug, label: staminaRestore.title },
]

export const POTION_EFFECTS_FILTER = defineFilter<readonly string[]>({
  id: "potion-effects",
  label: "Potion Effects",
  group: "type",
  editor: { kind: "multiselect", options: POTION_EFFECT_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    return runChecker(checkPotionEffects, facts, {
      potionEffects: [...selected],
      potionEffectsMode: "any",
    })
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
