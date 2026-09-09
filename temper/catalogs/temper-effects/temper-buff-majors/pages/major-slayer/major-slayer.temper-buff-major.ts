import type { TemperBuffMajor } from "../../temper-buff-major.page-type.ts"

export const majorSlayer = {
  id: "01a05fc5-f6bc-739d-89da-33800d2d9daf",
  pageTypeSlug: "temper-buff-major",
  slug: "major-slayer",
  title: "Major Slayer",
  key: "major-slayer",
  description: "Increases damage done to Dungeon, Trial, and Arena monsters by 10%",
  effects: "jsonl",
} as const satisfies TemperBuffMajor
