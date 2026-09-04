import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorFortitude = {
  id: "01a05fc5-f6bf-7e18-a218-1d993c45c46a",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-fortitude",
  title: "Minor Fortitude",
  key: "minor-fortitude",
  description: "Increases Health Recovery by 15%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
