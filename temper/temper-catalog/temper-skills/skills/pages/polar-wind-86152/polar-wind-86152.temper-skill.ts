import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const polarWind86152 = {
  id: "019e6f53-a519-7ad8-8f92-ad515d504842",
  pageTypeSlug: "temper-skill",
  slug: "polar-wind-86152",
  title: "Polar Wind",
  key: "polar-wind-86152",
  baseName: "Arctic Wind",
  description:
    '"Envelop yourself in winter winds, instantly healing for |cffffff6232|r Health and healing for an additional |cffffff1716|r Health every |cffffff2|r seconds over |cffffff10|r seconds. You also heal a nearby ally for |cffffff4154|r Health. This ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_warden_003_a.dds",
  esoSkillId: 86152,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
