import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorMending = {
  id: "01a05fc5-f6c0-73d4-b281-ba7fd03e4f81",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-mending",
  title: "Minor Mending",
  key: "minor-mending",
  description: "Increases healing done by 8%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
