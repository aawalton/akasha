import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const polarWind = {
  id: "019e6245-a6e7-72b0-bca4-52b7ccd8a36c",
  type: "page-type/temper-skill",
  slug: "polar-wind",
  title: "Polar Wind",
  key: "polar-wind",
  baseName: "Arctic Wind",
  description:
    "Envelop yourself in winter winds, instantly healing for 4958 Health and healing for an additional 1365 Health every 2 seconds over 10 seconds. You also heal a nearby ally for 3305 Health. This ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_warden_003_a.dds",
  esoSkillId: 86155,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-winters-embrace",
  skillType: "temper-skill-type/active",
  hashPlace: 904,
  createdAt: "2026-05-26T03:13:12.423Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.08536712 Health (Health, RankMod(1.033), Heal, SingleTarget, DOT, 8s duration, 2s tick, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 0.2066 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
