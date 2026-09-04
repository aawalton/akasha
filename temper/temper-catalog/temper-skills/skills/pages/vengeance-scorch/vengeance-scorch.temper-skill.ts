import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceScorch = {
  id: "019e6f53-a97a-7dbb-b9bf-99d38018fa5f",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-scorch",
  title: "Vengeance Scorch",
  key: "vengeance-scorch",
  baseName: "Vengeance Scorch",
  description:
    '"Stir a group of shalk that attack after |cffffff3|r seconds, dealing |cffffff12701|r Magic Damage to up to 3 enemies in front of you."',
  icon: "/esoui/art/icons/ability_warden_015.dds",
  esoSkillId: 247093,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-warden-animal-companions",
  skillType: "active",
  subcategoryId: "vengeance-warden-animal-companions",
} as const satisfies TemperSkill
