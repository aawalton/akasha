import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swiftlyForgotten = {
  id: "019e6238-c31d-70de-9cca-3efb9b907a49",
  type: "page-type/temper-skill",
  slug: "swiftly-forgotten",
  title: "Swiftly Forgotten",
  key: "swiftly-forgotten",
  baseName: "Swiftly Forgotten",
  description:
    "Bounty is decreased by 115 after 3 minutes.\nHeat is decreased by 64 after 3 seconds.",
  icon: "/esoui/art/icons/ability_thievesguild_passive_005.dds",
  esoSkillId: 76457,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/guild-thieves-guild",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
  hashPlace: 1317,
  createdAt: "2026-05-26T02:59:07.677Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 115 (Constant)", "<<2>> = 64 (Constant)"],
} as const satisfies TemperSkill
