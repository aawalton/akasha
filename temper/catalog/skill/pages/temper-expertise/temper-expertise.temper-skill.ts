import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const temperExpertise = {
  id: "019e6224-ccb3-7991-9d2b-fe2ba34af3e6",
  type: "page-type/temper-skill",
  slug: "temper-expertise",
  title: "Temper Expertise",
  key: "temper-expertise",
  baseName: "Temper Expertise",
  description: "More than doubles the chances to improve items with tempers.",
  icon: "/esoui/art/icons/ability_smith_004.dds",
  esoAbilityId: 48168,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-blacksmithing",
  skillType: "temper-skill-type/passive",
  hashPlace: 1331,
  createdAt: "2026-05-26T02:37:19.411Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
