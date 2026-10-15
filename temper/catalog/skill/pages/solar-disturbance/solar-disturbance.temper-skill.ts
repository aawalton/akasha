import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarDisturbance = {
  id: "019e6245-a736-7c18-94f2-a423e9f51060",
  type: "page-type/temper-skill",
  slug: "solar-disturbance",
  title: "Solar Disturbance",
  key: "solar-disturbance",
  baseName: "Nova",
  description:
    "Call down a fragment of the sun, dealing 1161 Magic Damage every 1 second for 8 seconds to enemies in the area and applying Major Maim to them for 10 seconds, reducing their damage done by 10%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing 2607 Magic Damage to all enemies in the area and stunning them for 3 seconds.",
  icon: "/esoui/art/icons/ability_templar_solar_disturbance.dds",
  esoSkillId: 24320,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1214,
  createdAt: "2026-05-26T03:13:12.502Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = Supernova (Constant)",
    "<<7>> = 0.1159 MaxStat + 1.217 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<8>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
