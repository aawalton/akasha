import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scrierSPatience = {
  id: "019e6f53-a6c8-716d-83e4-e6f0ed2cf99b",
  pageTypeSlug: "temper-skill",
  slug: "scrier-s-patience",
  title: "Scrier's Patience",
  key: "scrier-s-patience",
  baseName: "Scrier's Patience",
  description: '"Grants you an additional turn of Scrying."',
  icon: "/esoui/art/icons/ability_scrying_06a.dds",
  esoSkillId: 139778,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
