import { checkPotionEffects } from "@temper/game-items-rules-eval/conditions/check-potion-effects"
import { runChecker } from "../eval-adapter"
import type { FilterEditorOption } from "../filter-types"
import { defineFilter } from "../filter-types"

const POTION_EFFECT_OPTIONS: readonly FilterEditorOption[] = [
  { value: "health-restore", label: "Restores Health" },
  { value: "magicka-restore", label: "Restores Magicka" },
  { value: "stamina-restore", label: "Restores Stamina" },
]

function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export const potionEffectsFilter = defineFilter<readonly string[]>({
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
