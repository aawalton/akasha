import type { TemperBuffMinor } from "akasha/temper/catalog/temper-effects/temper-buff-minors/temper-buff-minor.page-type.types.ts"

export const minorCourage = {
  id: "01a05fc5-f6bd-76d0-a5c0-8497265ab981",
  type: "temper-buff-minor",
  slug: "minor-courage",
  title: "Minor Courage",
  key: "minor-courage",
  description: "Increases Weapon and Spell Damage by 215",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
