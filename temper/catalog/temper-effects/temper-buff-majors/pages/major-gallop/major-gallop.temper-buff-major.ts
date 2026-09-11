import type { TemperBuffMajor } from "akasha/temper/catalog/temper-effects/temper-buff-majors/temper-buff-major.page-type.types.ts"

export const majorGallop = {
  id: "01a05fc5-f6b9-7908-8978-0236de84f77d",
  type: "temper-buff-major",
  slug: "major-gallop",
  title: "Major Gallop",
  key: "major-gallop",
  description: "Increases mounted speed by 30%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
