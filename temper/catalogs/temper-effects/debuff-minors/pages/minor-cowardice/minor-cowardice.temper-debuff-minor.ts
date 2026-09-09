import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorCowardice = {
  id: "01a05fc6-42c3-7215-bb24-ae4cf64b44da",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-cowardice",
  title: "Minor Cowardice",
  key: "minor-cowardice",
  description: "Reduces Weapon and Spell Damage by 215",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
