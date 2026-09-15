import type { TemperBuffMajor } from "akasha/temper/catalog/temper-effect/temper-buff-major/temper-buff-major.page-type.types.ts"

export const majorMending = {
  id: "01a05fc5-f6ba-7eab-aa2e-27f726d0edfd",
  type: "page-type/temper-buff-major",
  slug: "major-mending",
  title: "Major Mending",
  key: "major-mending",
  description: "Increases healing done by 16%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
