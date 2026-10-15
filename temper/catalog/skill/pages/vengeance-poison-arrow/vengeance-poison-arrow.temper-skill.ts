import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeancePoisonArrow = {
  id: "019e6f53-a952-7d7c-abcd-232e058fc243",
  type: "page-type/temper-skill",
  slug: "vengeance-poison-arrow",
  title: "Vengeance Poison Arrow",
  key: "vengeance-poison-arrow",
  baseName: "Vengeance Poison Arrow",
  description:
    "Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff5008|r Poison Damage and an additional |cffffff9450|r Poison Damage over |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_bow_002.dds",
  esoSkillId: 241275,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1522,
  createdAt: "2026-05-28T16:03:34.354Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4725 Poison Damage (Constant)",
    "<<2>> = 9450 Poison Damage (Constant)",
    "<<3>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
