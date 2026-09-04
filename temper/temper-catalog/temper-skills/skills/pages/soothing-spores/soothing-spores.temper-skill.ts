import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soothingSpores = {
  id: "019e6245-a738-7df0-8e71-7269cd7e2b8b",
  pageTypeSlug: "temper-skill",
  slug: "soothing-spores",
  title: "Soothing Spores",
  key: "soothing-spores",
  baseName: "Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing you and your allies for 2700 Health.\\n\\nHeals for 15% more on allies that are within 8 meters of you."',
  icon: "/esoui/art/icons/ability_warden_008_a.dds",
  esoSkillId: 93777,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-green-balance",
  skillType: "active",
  subcategoryId: "warden-green-balance",
} as const satisfies TemperSkill
