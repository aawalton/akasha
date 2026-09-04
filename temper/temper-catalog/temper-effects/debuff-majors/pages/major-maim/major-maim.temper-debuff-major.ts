import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.ts"

export const majorMaim = {
  id: "01a05fc6-42c2-794d-84af-249d34bd9a2f",
  pageTypeSlug: "temper-debuff-major",
  slug: "major-maim",
  title: "Major Maim",
  key: "major-maim",
  description: "Reduces damage done by 10%",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
