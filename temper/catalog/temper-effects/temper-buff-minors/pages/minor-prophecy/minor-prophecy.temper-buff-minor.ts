import type { TemperBuffMinor } from "akasha/temper/catalog/temper-effects/temper-buff-minors/temper-buff-minor.page-type.types.ts"

export const minorProphecy = {
  id: "01a05fc5-f6c0-7d96-bd0c-e9137eda44b3",
  type: "temper-buff-minor",
  slug: "minor-prophecy",
  title: "Minor Prophecy",
  key: "minor-prophecy",
  description: "Increases Spell Critical by 1314",
  effects: "jsonl",
} as const satisfies TemperBuffMinor
