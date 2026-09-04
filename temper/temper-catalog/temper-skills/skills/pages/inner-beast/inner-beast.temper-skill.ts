import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerBeast = {
  id: "019e6238-c2cc-71e9-9639-3b9eabf32566",
  pageTypeSlug: "temper-skill",
  slug: "inner-beast",
  title: "Inner Beast",
  key: "inner-beast",
  baseName: "Inner Fire",
  description:
    '"Ignite the fires of hate in an enemy\'s heart, dealing 2160 Physical Damage, taunting them to attack you, and applying Minor Maim and Minor Vulnerability for 15 seconds, reducing their damage done and increasing their damage taken by 5%.\\n\\nAn ally targeting the enemy can activate the Radiate synergy, dealing 1344 Flame Damage to them over 3 seconds then an additional 2249 Flame Damage to them and other nearby enemies."',
  icon: "/esoui/art/icons/ability_undaunted_002_a.dds",
  esoSkillId: 43393,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 2,
  rank: 12,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
