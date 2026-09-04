import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceSearingStrike = {
  id: "019e6f53-a97c-749e-9213-a6d0d3831c61",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-searing-strike",
  title: "Vengeance Searing Strike",
  key: "vengeance-searing-strike",
  baseName: "Vengeance Searing Strike",
  description:
    '"Slash an enemy with flame, dealing |cffffff5565|r Flame Damage and an additional |cffffff10500|r Flame Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_dragonknight_003.dds",
  esoSkillId: 237607,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "vengeance-dragonknight-ardent-flame",
} as const satisfies TemperSkill
