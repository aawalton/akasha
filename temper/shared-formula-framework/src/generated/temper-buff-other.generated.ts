/**
 * Temper Other Buffs (Generated)
 *
 * ESO Other-category buff data sourced from the universal pages table
 * (page type: temper-buff-other). Entries with empty `effects` arrays
 * are permitted (e.g. `vanish` is purely cosmetic).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

interface BuffOtherEffect {
  metricId: string
  effectType: string
  effectValue: number | { value: number; seconds: number }
}

interface BuffOtherTemplate {
  id: string
  name: string
  description: string
  categoryId: "buffs"
  subcategoryId: "other"
  effects: readonly BuffOtherEffect[]
}

/**
 * Keyed record of Other-category buff templates. The literal-id keys flow
 * into `createDataFile`'s `buffsOther.ids` so `(typeof buffsOther.ids)[number]`
 * stays literal-union typed for downstream consumers.
 */
export const TEMPER_BUFF_OTHER_DATA = {
  "empower": {
    id: "empower" as const,
    name: "Empower",
    description: "Increases Heavy Attack damage against monsters by 70%",
    categoryId: "buffs" as const,
    subcategoryId: "other" as const,
    effects: [
      { metricId: "damage-done-heavy-attack" as const, effectType: "fractional-change" as const, effectValue: 0.7 },
    ],
  },
  "vanish": {
    id: "vanish" as const,
    name: "Vanish",
    description: "Disappear from sight",
    categoryId: "buffs" as const,
    subcategoryId: "other" as const,
    effects: [],
  },
} satisfies Record<string, BuffOtherTemplate>
