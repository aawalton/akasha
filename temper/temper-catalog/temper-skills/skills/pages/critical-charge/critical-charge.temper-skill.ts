import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const criticalCharge = {
  id: "019e6f53-a035-7736-8071-908d23594fbe",
  pageTypeSlug: "temper-skill",
  slug: "critical-charge",
  title: "Critical Charge",
  key: "critical-charge",
  baseName: "Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing |cffffff4846|r Physical Damage. \\n\\nThis attack is always a Critical Strike."',
  icon: "/esoui/art/icons/ability_2handed_003.dds",
  esoSkillId: 28448,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
