import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const destructiveTouch = {
  id: "019e6f53-a0c6-7483-8c7e-aba123c6fe74",
  pageTypeSlug: "temper-skill",
  slug: "destructive-touch",
  title: "Destructive Touch",
  key: "destructive-touch",
  baseName: "Destructive Touch",
  description:
    '"Devastate an enemy with an enhanced charge from your staff, dealing |cffffff4036|r Magic Damage and an additional |cffffff11420|r Magic Damage over |cffffff20|r seconds. \\n\\nThe initial hit always applies the element\'s status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_005.dds",
  esoSkillId: 29091,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
