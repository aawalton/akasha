import type { TemperDebuffMajor } from "akasha/temper/catalog/temper-effects/temper-debuff-majors/temper-debuff-major.page-type.types.ts"

export const majorBrittle = {
  id: "01a05fc6-42c1-7b9e-a7e6-30fcae793727",
  type: "temper-debuff-major",
  slug: "major-brittle",
  title: "Major Brittle",
  key: "major-brittle",
  description: "Increases Critical Damage taken by 20%",
  effects: "jsonl",
} as const satisfies TemperDebuffMajor
