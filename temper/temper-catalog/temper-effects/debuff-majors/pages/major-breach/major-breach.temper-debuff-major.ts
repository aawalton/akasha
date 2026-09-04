import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.ts"

export const majorBreach = {
  id: "01a05fc6-42c0-7fff-b0a0-4526f19bc5d5",
  pageTypeSlug: "temper-debuff-major",
  slug: "major-breach",
  title: "Major Breach",
  key: "major-breach",
  description: "Reduces Physical and Spell Resistance by 5948",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
