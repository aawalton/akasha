import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rebate = {
  id: "019e6245-a6ff-7fc5-83e8-53951ed4ae20",
  type: "page-type/temper-skill",
  slug: "rebate",
  title: "Rebate",
  key: "rebate",
  baseName: "Rebate",
  description:
    '"You restore 371 Magicka or Stamina when one of your non-Ultimate Daedric Summoning abilities end. The resource returned is dictated by the ability\'s cost."',
  icon: "/esoui/art/icons/ability_sorcerer_056.dds",
  esoSkillId: 45198,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
} as const satisfies TemperSkill
