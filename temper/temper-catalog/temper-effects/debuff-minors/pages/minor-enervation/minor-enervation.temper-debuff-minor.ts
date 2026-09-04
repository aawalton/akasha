import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorEnervation = {
  id: "01a05fc6-42c4-76bc-bee9-88b621b2df71",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-enervation",
  title: "Minor Enervation",
  key: "minor-enervation",
  description: "Reduces Critical Damage done by 10%",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
