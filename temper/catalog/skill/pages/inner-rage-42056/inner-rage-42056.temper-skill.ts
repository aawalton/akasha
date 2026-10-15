import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const innerRage42056 = {
  id: "019e6f53-a37f-72c8-a153-abff12df178e",
  type: "page-type/temper-skill",
  slug: "inner-rage-42056",
  title: "Inner Rage",
  key: "inner-rage-42056",
  baseName: "Inner Fire",
  description:
    "Ignite the fires of hate in an enemy's heart, dealing |cffffff3753|r Flame Damage and taunting them to attack you for |cffffff15|r seconds.\n\nUp to 3 allies targeting the taunted enemy can activate the Radiate synergy, dealing |cffffff4422|r Flame Damage to them over |cffffff3|r seconds then an additional |cffffff8261|r Flame Damage to them and other nearby enemies.",
  icon: "/esoui/art/icons/ability_undaunted_002_b.dds",
  esoSkillId: 42056,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 3,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 690,
  createdAt: "2026-05-28T16:03:32.863Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.046485 MaxStat + 0.488093 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Radiate (Constant)",
    "<<4>> = 0.0199778 MaxStat + 0.210472 MaxPower - 1.95606 (Ultimate, ratio = 10.54, Dmg, Flame, SingleTarget, DOT, 2s duration, 1s tick, R2 = 0.999993)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
