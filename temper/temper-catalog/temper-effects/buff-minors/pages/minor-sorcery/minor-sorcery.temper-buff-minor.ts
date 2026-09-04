import type { TemperBuffMinor } from "../../temper-buff-minor.page-type.ts"

export const minorSorcery = {
  id: "01a05fc5-f6c1-7428-8099-1d50e48f24d1",
  pageTypeSlug: "temper-buff-minor",
  slug: "minor-sorcery",
  title: "Minor Sorcery",
  key: "minor-sorcery",
  description: "Increases Spell Damage by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
