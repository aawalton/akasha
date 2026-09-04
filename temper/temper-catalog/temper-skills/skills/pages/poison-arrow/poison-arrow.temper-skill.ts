import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const poisonArrow = {
  id: "019e6f53-a512-7745-9e73-92dbe61f3f29",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
