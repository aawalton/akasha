import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const polarWind = {
  id: "019e6245-a6e7-72b0-bca4-52b7ccd8a36c",
  pageTypeSlug: "temper-skill",
  slug: "polar-wind",
  title: "Polar Wind",
  key: "polar-wind",
  baseName: "Arctic Wind",
  description:
    '"Envelop yourself in winter winds, instantly healing for 4958 Health and healing for an additional 1365 Health every 2 seconds over 10 seconds. You also heal a nearby ally for 3305 Health. This ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_warden_003_a.dds",
  esoSkillId: 86155,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
