import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceFungalGrowth = {
  id: "019e6f53-a919-74ee-86a4-7e4815371fe2",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-fungal-growth",
  title: "Vengeance Fungal Growth",
  key: "vengeance-fungal-growth",
  baseName: "Vengeance Fungal Growth",
  description:
    '"Seed a large area of mushrooms in front of you, healing up to 3 of you and your allies for |cffffff12048|r Health."',
  icon: "/esoui/art/icons/ability_warden_008.dds",
  esoSkillId: 238054,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-green-balance",
  skillType: "active",
  subcategoryId: "vengeance-warden-green-balance",
} as const satisfies TemperSkill
