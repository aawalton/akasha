import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceCriticalCharge = {
  id: "019e6f53-a8dc-7c38-b41a-b2f3a5404341",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-critical-charge",
  title: "Vengeance Critical Charge",
  key: "vengeance-critical-charge",
  baseName: "Vengeance Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing |cffffff6678|r Physical Damage. \\n\\nThis attack is always a Critical Strike."',
  icon: "/esoui/art/icons/ability_2handed_003.dds",
  esoSkillId: 240459,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-two-handed",
  skillType: "active",
  subcategoryId: "vengeance-weapon-two-handed",
} as const satisfies TemperSkill
