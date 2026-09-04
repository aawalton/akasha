import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const excavatorSReserves = {
  id: "019e6f53-a1b5-7ef8-ab27-4ccd1bdcccd8",
  pageTypeSlug: "temper-skill",
  slug: "excavator-s-reserves",
  title: "Excavator's Reserves",
  key: "excavator-s-reserves",
  baseName: "Excavator's Reserves",
  description: '"Increases the amount of time you have available when excavating a dig site."',
  icon: "/esoui/art/icons/u26_ability_digging_05.dds",
  esoSkillId: 139910,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
