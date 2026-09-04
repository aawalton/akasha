import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceVigor = {
  id: "019e6f53-a9aa-758c-9188-57c20df81f2d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-vigor",
  title: "Vengeance Vigor",
  key: "vengeance-vigor",
  baseName: "Vengeance Vigor",
  description:
    '"Let loose a battle cry, instilling you with resolve and healing for |cffffff28916|r Health over |cffffff6|r seconds."',
  icon: "/esoui/art/icons/ability_ava_vigor.dds",
  esoSkillId: 244496,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-alliance-war-assault",
  skillType: "active",
  subcategoryId: "vengeance-alliance-war-assault",
} as const satisfies TemperSkill
