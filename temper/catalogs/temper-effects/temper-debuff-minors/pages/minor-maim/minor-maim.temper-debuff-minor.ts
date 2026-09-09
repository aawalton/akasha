import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorMaim = {
  id: "01a05fc6-42c5-7e88-880a-fe6da59ba896",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-maim",
  title: "Minor Maim",
  key: "minor-maim",
  description: "Reduces damage done by 5%",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
