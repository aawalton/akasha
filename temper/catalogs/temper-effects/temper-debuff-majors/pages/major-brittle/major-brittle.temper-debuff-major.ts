import type { TemperDebuffMajor } from "../../temper-debuff-major.page-type.ts"

export const majorBrittle = {
  id: "01a05fc6-42c1-7b9e-a7e6-30fcae793727",
  pageTypeSlug: "temper-debuff-major",
  slug: "major-brittle",
  title: "Major Brittle",
  key: "major-brittle",
  description: "Increases Critical Damage taken by 20%",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
