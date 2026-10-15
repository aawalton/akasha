import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const polarWind86152 = {
  id: "019e6f53-a519-7ad8-8f92-ad515d504842",
  type: "page-type/temper-skill",
  slug: "polar-wind-86152",
  title: "Polar Wind",
  key: "polar-wind-86152",
  baseName: "Arctic Wind",
  description:
    "Envelop yourself in winter winds, instantly healing for |cffffff6232|r Health and healing for an additional |cffffff1716|r Health every |cffffff2|r seconds over |cffffff10|r seconds. You also heal a nearby ally for |cffffff4154|r Health. This ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_warden_003_a.dds",
  esoSkillId: 86152,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 905,
  createdAt: "2026-05-28T16:03:33.273Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.08264 Health (Health, RankMod(1), Heal, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 0.2066 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
