import type { TemperScribingSource } from "akasha/temper/catalog/temper-skill/temper-scribing-sources/temper-scribing-source.page-type.types.ts"

export const dlcIncursionDailies = {
  id: "019e12b0-85ed-7099-927a-937b2c5d66c6",
  type: "temper-scribing-source",
  slug: "dlc-incursion-dailies",
  title: "DLC Incursion Dailies",
  displayOrder: 2,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: [
    "solstice",
    "west-weald",
    "telvanni-peninsula",
    "high-isle",
    "galen",
    "the-deadlands",
    "blackwood",
    "western-skyrim",
    "the-reach",
    "northern-elsweyr",
    "southern-elsweyr",
    "summerset",
  ],
} as const satisfies TemperScribingSource
