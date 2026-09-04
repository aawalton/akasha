import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorBreach = {
  id: "01a05fc6-42c3-7812-aaf2-932690fda4df",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-breach",
  title: "Minor Breach",
  key: "minor-breach",
  description: "Reduces Physical and Spell Resistance by 2974",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
