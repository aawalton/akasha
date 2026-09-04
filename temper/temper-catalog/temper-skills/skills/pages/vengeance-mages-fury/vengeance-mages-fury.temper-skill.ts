import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceMagesFury = {
  id: "019e6f53-a938-7fc3-95a6-e3cfd36ed8cc",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-mages-fury",
  title: "Vengeance Mages' Fury",
  key: "vengeance-mages-fury",
  baseName: "Vengeance Mages' Fury",
  description:
    '"Call down lightning to strike an enemy, dealing |cffffff5565|r Shock Damage.\\n\\nIf the enemy was below |cffffff20|r% Health, an explosion deals an additional |cffffff15288|r Shock Damage to them and up to 2 nearby enemies."',
  icon: "/esoui/art/icons/ability_sorcerer_mage_fury.dds",
  esoSkillId: 237948,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-sorcerer-storm-calling",
  skillType: "active",
  subcategoryId: "vengeance-sorcerer-storm-calling",
} as const satisfies TemperSkill
