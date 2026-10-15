import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarPrison = {
  id: "019e6245-a737-7d1e-a3fa-f9f93ec02090",
  type: "page-type/temper-skill",
  slug: "solar-prison",
  title: "Solar Prison",
  key: "solar-prison",
  baseName: "Nova",
  description:
    "Call down a fragment of the sun, dealing 1199 Magic Damage every 1 second for 8 seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Gravity Crush synergy, dealing 5215 Magic Damage to all enemies in the area and stunning them for 5 seconds.",
  icon: "/esoui/art/icons/ability_templar_solar_prison.dds",
  esoSkillId: 24301,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1217,
  createdAt: "2026-05-26T03:13:12.503Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0533085 MaxStat + 0.56047 MaxPower - 1.35721 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999999)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = Gravity Crush (Constant)",
    "<<6>> = 0.231809 MaxStat + 2.434 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
