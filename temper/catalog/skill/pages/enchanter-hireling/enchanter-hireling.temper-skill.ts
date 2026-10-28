import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const enchanterHireling = {
  id: "019e6224-cc93-721d-be9c-18b94840e3ce",
  type: "page-type/temper-skill",
  slug: "enchanter-hireling",
  title: "Enchanter Hireling",
  key: "enchanter-hireling",
  baseName: "Enchanter Hireling",
  description:
    "A hireling will send you runestones every day. You have a greater chance at Essence and better Aspect runestones.",
  icon: "/esoui/art/icons/ability_enchanter_008.dds",
  esoAbilityId: 46772,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-enchanting",
  skillType: "temper-skill-type/passive",
  hashPlace: 430,
  createdAt: "2026-05-26T02:37:19.379Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
