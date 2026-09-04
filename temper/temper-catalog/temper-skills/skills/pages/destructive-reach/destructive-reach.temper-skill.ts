import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const destructiveReach = {
  id: "019e6226-00e5-79ff-b30c-29db3fd45117",
  pageTypeSlug: "temper-skill",
  slug: "destructive-reach",
  title: "Destructive Reach",
  key: "destructive-reach",
  baseName: "Destructive Touch",
  description:
    '"Devastate an enemy with an enhanced charge from your staff, dealing 1161 Magic Damage and an additional 3470 Magic Damage over 20 seconds.\\n\\nThe initial hit always applies the element\'s status effect."',
  icon: "/esoui/art/icons/ability_destructionstaff_005_b.dds",
  esoSkillId: 41047,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-destruction-staff",
  skillType: "active",
  subcategoryId: "weapon-destruction-staff",
} as const satisfies TemperSkill
