import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeancePoisonArrow = {
  id: "019e6f53-a952-7d7c-abcd-232e058fc243",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-poison-arrow",
  title: "Vengeance Poison Arrow",
  key: "vengeance-poison-arrow",
  baseName: "Vengeance Poison Arrow",
  description:
    '"Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff5008|r Poison Damage and an additional |cffffff9450|r Poison Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_bow_002.dds",
  esoSkillId: 241275,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-bow",
  skillType: "active",
  subcategoryId: "vengeance-weapon-bow",
} as const satisfies TemperSkill
