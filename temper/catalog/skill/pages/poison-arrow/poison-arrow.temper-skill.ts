import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const poisonArrow = {
  id: "019e6f53-a512-7745-9e73-92dbe61f3f29",
  type: "page-type/temper-skill",
  slug: "poison-arrow",
  title: "Poison Arrow",
  key: "poison-arrow",
  baseName: "Poison Arrow",
  description:
    '"Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff4036|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_bow_002.dds",
  esoSkillId: 28869,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
