import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scriersPatience = {
  id: "019e6251-4ce5-7238-ba7a-e02771800bf0",
  pageTypeSlug: "temper-skill",
  slug: "scriers-patience",
  title: "Scrier's Patience",
  key: "scriers-patience",
  baseName: "Scrier's Patience",
  description: '"Grants you two additional turns of Scrying."',
  icon: "/esoui/art/icons/ability_scrying_06b.dds",
  esoSkillId: 139779,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
