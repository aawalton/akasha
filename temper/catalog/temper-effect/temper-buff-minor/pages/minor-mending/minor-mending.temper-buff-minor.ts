import type { TemperBuffMinor } from "akasha/temper/catalog/temper-effect/temper-buff-minor/temper-buff-minor.page-type.types.ts"

export const minorMending = {
  id: "01a05fc5-f6c0-73d4-b281-ba7fd03e4f81",
  type: "page-type/temper-buff-minor",
  slug: "minor-mending",
  title: "Minor Mending",
  key: "minor-mending",
  description: "Increases healing done by 8%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
