import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorMending = {
  id: "01a05fc5-f6ba-7eab-aa2e-27f726d0edfd",
  pageTypeSlug: "temper-buff-major",
  slug: "major-mending",
  title: "Major Mending",
  key: "major-mending",
  description: "Increases healing done by 16%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
