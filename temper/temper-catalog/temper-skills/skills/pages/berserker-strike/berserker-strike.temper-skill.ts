import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const berserkerStrike = {
  id: "019e6f53-9f05-7485-a764-fc8263de60e7",
  pageTypeSlug: "temper-skill",
  slug: "berserker-strike",
  title: "Berserker Strike",
  key: "berserker-strike",
  baseName: "Berserker Strike",
  description:
    '"Strike at an enemy with a vicious blow, dealing |cffffff12116|r Physical Damage to them and all nearby enemies.\\n\\nThis attack ignores the target\'s Physical Resistance, and grants you Physical and Spell Resistance equal to the amount ignored from the initial target for |cffffff12|r seconds."',
  icon: "/esoui/art/icons/ability_2handed_006.dds",
  esoSkillId: 83216,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 50,
  skillLineId: "weapon-two-handed",
  skillType: "ultimate",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
