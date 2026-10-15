import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarPrison21755 = {
  id: "019e6f53-a752-702e-aa98-1eec5f64203a",
  type: "page-type/temper-skill",
  slug: "solar-prison-21755",
  title: "Solar Prison",
  key: "solar-prison-21755",
  baseName: "Nova",
  description:
    "Call down a fragment of the sun, dealing |cffffff4170|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by |cffffff10|r%.\n\nAn ally near the fragment can activate the Gravity Crush synergy, dealing |cffffff19152|r Magic Damage to all enemies in the area and stunning them for |cffffff5|r seconds.",
  icon: "/esoui/art/icons/ability_templar_solar_prison.dds",
  esoSkillId: 21755,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1218,
  createdAt: "2026-05-28T16:03:33.842Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = Gravity Crush (Constant)",
    "<<6>> = 0.231809 MaxStat + 2.434 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
