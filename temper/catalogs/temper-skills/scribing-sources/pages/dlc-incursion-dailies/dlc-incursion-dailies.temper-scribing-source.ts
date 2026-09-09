import type { TemperScribingSource } from "../../temper-scribing-source.page-type.ts"

export const dlcIncursionDailies = {
  id: "019e12b0-85ed-7099-927a-937b2c5d66c6",
  pageTypeSlug: "temper-scribing-source",
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
