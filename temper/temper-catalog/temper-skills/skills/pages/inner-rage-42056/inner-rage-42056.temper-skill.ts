import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const innerRage42056 = {
  id: "019e6f53-a37f-72c8-a153-abff12df178e",
  pageTypeSlug: "temper-skill",
  slug: "inner-rage-42056",
  title: "Inner Rage",
  key: "inner-rage-42056",
  baseName: "Inner Fire",
  description:
    '"Ignite the fires of hate in an enemy\'s heart, dealing |cffffff3753|r Flame Damage and taunting them to attack you for |cffffff15|r seconds.\\n\\nUp to 3 allies targeting the taunted enemy can activate the Radiate synergy, dealing |cffffff4422|r Flame Damage to them over |cffffff3|r seconds then an additional |cffffff8261|r Flame Damage to them and other nearby enemies."',
  icon: "/esoui/art/icons/ability_undaunted_002_b.dds",
  esoSkillId: 42056,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 3,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
