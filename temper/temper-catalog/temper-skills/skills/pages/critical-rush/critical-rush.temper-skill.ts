import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const criticalRush = {
  id: "019e6226-00dd-7825-9439-7ece7644e5de",
  pageTypeSlug: "temper-skill",
  slug: "critical-rush",
  title: "Critical Rush",
  key: "critical-rush",
  baseName: "Critical Charge",
  description:
    '"Launch across the earth and smash an enemy, dealing 1393 Physical Damage. Deals up to 50% more damage based on the distance traveled.\\n\\nThis attack is always a Critical Strike."',
  icon: "/esoui/art/icons/ability_2handed_003_b.dds",
  esoSkillId: 39822,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
