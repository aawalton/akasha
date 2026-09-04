import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorAegis = {
  id: "01a05fc5-f6b6-76f4-8c68-3b6a6199e876",
  pageTypeSlug: "temper-buff-major",
  slug: "major-aegis",
  title: "Major Aegis",
  key: "major-aegis",
  description: "Reduces damage taken from Dungeon, Trial, and Arena monsters by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
