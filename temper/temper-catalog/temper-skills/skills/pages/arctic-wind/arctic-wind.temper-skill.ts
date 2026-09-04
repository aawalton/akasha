import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const arcticWind = {
  id: "019e6f53-9ebe-720b-a89f-e119635af20d",
  pageTypeSlug: "temper-skill",
  slug: "arctic-wind",
  title: "Arctic Wind",
  key: "arctic-wind",
  baseName: "Arctic Wind",
  description:
    '"Envelop yourself in winter winds, instantly healing for |cffffff6232|r Health and an additional |cffffff1246|r Health every |cffffff2|r seconds over |cffffff10|r seconds. This ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_warden_003.dds",
  esoSkillId: 86148,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
