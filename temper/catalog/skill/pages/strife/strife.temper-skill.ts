import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const strife = {
  id: "019e6f53-a7c4-7354-860f-091d7669ed6e",
  type: "page-type/temper-skill",
  slug: "strife",
  title: "Strife",
  key: "strife",
  baseName: "Strife",
  description:
    "Steal an enemy's life force, dealing |cffffff5384|r Magic Damage and healing you or a nearby ally for |cffffff51|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_nightblade_012.dds",
  esoSkillId: 33291,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/nightblade-siphoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1277,
  createdAt: "2026-05-28T16:03:33.956Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0903776 MaxStat + 0.945428 MaxPower - 22.9602 (Ultimate, ratio = 10.46, RankMod(1), Dmg, Magic, SingleTarget, Direct, Melee, 0.5s duration, R2 = 0.991181)",
    "<<2>> = 33 (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 10 seconds (Constant)",
    "<<5>> = 1% (Constant)",
    "<<6>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
