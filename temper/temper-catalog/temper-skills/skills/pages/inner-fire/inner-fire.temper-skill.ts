import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerFire = {
  id: "019e6f53-a378-71d4-bf4f-390e5faa86c9",
  pageTypeSlug: "temper-skill",
  slug: "inner-fire",
  title: "Inner Fire",
  key: "inner-fire",
  baseName: "Inner Fire",
  description:
    '"Ignite the fires of hate in an enemy\'s heart, dealing |cffffff3634|r Flame Damage and taunting them to attack you for |cffffff15|r seconds.\\n\\nAn ally targeting the taunted enemy can activate the Radiate synergy, dealing |cffffff4422|r Flame Damage to them over |cffffff3|r seconds then an additional |cffffff8261|r Flame Damage to them and other nearby enemies."',
  icon: "/esoui/art/icons/ability_undaunted_002.dds",
  esoSkillId: 39475,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
