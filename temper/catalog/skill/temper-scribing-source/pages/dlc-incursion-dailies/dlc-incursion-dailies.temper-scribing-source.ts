import type { TemperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.types.ts"

export const dlcIncursionDailies = {
  id: "019e12b0-85ed-7099-927a-937b2c5d66c6",
  type: "page-type/temper-scribing-source",
  slug: "dlc-incursion-dailies",
  title: "DLC Incursion Dailies",
  displayOrder: 2,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: [
    "temper-zone/solstice",
    "temper-zone/west-weald",
    "temper-zone/telvanni-peninsula",
    "temper-zone/high-isle",
    "temper-zone/galen",
    "temper-zone/the-deadlands",
    "temper-zone/blackwood",
    "temper-zone/western-skyrim",
    "temper-zone/the-reach",
    "temper-zone/northern-elsweyr",
    "temper-zone/southern-elsweyr",
    "temper-zone/summerset",
  ],
} as const satisfies TemperScribingSource
