import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const excavatorsReserves = {
  id: "019e6251-4cb1-73f0-9138-564b35d11417",
  type: "page-type/temper-skill",
  slug: "excavators-reserves",
  title: "Excavator's Reserves",
  key: "excavators-reserves",
  baseName: "Excavator's Reserves",
  description:
    '"Further increases the amount of time you have available when excavating a dig site."',
  icon: "/esoui/art/icons/u26_ability_digging_05.dds",
  esoSkillId: 139911,
  isMorph: false,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
