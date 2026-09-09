import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorBrittle = {
  id: "01a05fc6-42c3-744b-a88f-35d6354c5588",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-brittle",
  title: "Minor Brittle",
  key: "minor-brittle",
  description: "Increases Critical Damage taken by 10%",
  effects: "jsonl",
} as const satisfies TemperDebuffMinor
