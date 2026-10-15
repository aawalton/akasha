import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const nova = {
  id: "019e6f53-a4c6-760c-9fb2-913f087cc408",
  type: "page-type/temper-skill",
  slug: "nova",
  title: "Nova",
  key: "nova",
  baseName: "Nova",
  description:
    "Call down a fragment of the sun, dealing |cffffff4036|r Magic Damage every |cffffff1|r second for |cffffff8|r seconds to enemies in the area and afflicting them with Major Maim, reducing their damage done by |cffffff10|r%.\n\nAn ally near the fragment can activate the Supernova synergy, dealing |cffffff9576|r Magic Damage to all enemies in the area and stunning them for |cffffff3|r seconds.",
  icon: "/esoui/art/icons/ability_templar_nova.dds",
  esoSkillId: 21752,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 861,
  createdAt: "2026-05-28T16:03:33.190Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0499489 MaxStat + 0.524968 MaxPower - 0.306011 (Ultimate, ratio = 10.51, Dmg, Magic, AOE, DOT, 1s tick, R2 = 0.999999)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 8 seconds (Constant)",
    "<<4>> = 10% (Constant)",
    "<<5>> = Supernova (Constant)",
    "<<6>> = 0.1159 MaxStat + 1.217 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
