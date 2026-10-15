import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const innerFire = {
  id: "019e6f53-a378-71d4-bf4f-390e5faa86c9",
  type: "page-type/temper-skill",
  slug: "inner-fire",
  title: "Inner Fire",
  key: "inner-fire",
  baseName: "Inner Fire",
  description:
    "Ignite the fires of hate in an enemy's heart, dealing |cffffff3634|r Flame Damage and taunting them to attack you for |cffffff15|r seconds.\n\nAn ally targeting the taunted enemy can activate the Radiate synergy, dealing |cffffff4422|r Flame Damage to them over |cffffff3|r seconds then an additional |cffffff8261|r Flame Damage to them and other nearby enemies.",
  icon: "/esoui/art/icons/ability_undaunted_002.dds",
  esoSkillId: 39475,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 686,
  createdAt: "2026-05-28T16:03:32.856Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.045 MaxStat + 0.4725 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Radiate (Constant)",
    "<<4>> = 0.0199778 MaxStat + 0.210472 MaxPower - 1.95606 (Ultimate, ratio = 10.54, Dmg, Flame, SingleTarget, DOT, 2s duration, 1s tick, R2 = 0.999993)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
