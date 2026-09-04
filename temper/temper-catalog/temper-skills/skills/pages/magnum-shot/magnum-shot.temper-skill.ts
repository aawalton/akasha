import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magnumShot = {
  id: "019e6226-00ff-7d48-832b-daf9f71a08cc",
  pageTypeSlug: "temper-skill",
  slug: "magnum-shot",
  title: "Magnum Shot",
  key: "magnum-shot",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing 1727 Physical Damage and knocking them back 8 meters."',
  icon: "/esoui/art/icons/ability_bow_004_b.dds",
  esoSkillId: 40869,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
