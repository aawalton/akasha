import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarDisturbance21758 = {
  id: "019e6f53-a74b-7e4e-a90f-c0b07a388516",
  type: "page-type/temper-skill",
  slug: "solar-disturbance-21758",
  title: "Solar Disturbance",
  key: "solar-disturbance-21758",
  baseName: "Nova",
  description:
    "Call down a fragment of the sun, dealing |cffffff4038|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and applying Major Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff10|r%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing |cffffff9576|r Magic Damage to all enemies in the area and stunning them for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_templar_solar_disturbance.dds",
  esoSkillId: 21758,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1215,
  createdAt: "2026-05-28T16:03:33.835Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 7 seconds (Constant)",
    "<<5>> = 10% (Constant)",
    "<<6>> = Supernova (Constant)",
    "<<7>> = 0.1159 MaxStat + 1.217 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<8>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
