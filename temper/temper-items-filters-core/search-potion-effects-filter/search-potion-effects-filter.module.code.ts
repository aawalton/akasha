import { checkPotionEffects } from "@akasha/temper-items-rules-eval/check-potion-effects"
import { runChecker } from "../search-eval-adapter/search-eval-adapter.module.code.ts"
import type { FilterEditorOption } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "../search-string-array-parse/search-string-array-parse.module.code.ts"

const POTION_EFFECT_OPTIONS: readonly FilterEditorOption[] = [
  { value: "health-restore", label: "Restores Health" },
  { value: "magicka-restore", label: "Restores Magicka" },
  { value: "stamina-restore", label: "Restores Stamina" },
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
