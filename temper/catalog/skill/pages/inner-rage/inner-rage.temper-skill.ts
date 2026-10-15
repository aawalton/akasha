import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const innerRage = {
  id: "019e6238-c2ce-73c1-8d3e-b346b240ad8d",
  type: "page-type/temper-skill",
  slug: "inner-rage",
  title: "Inner Rage",
  key: "inner-rage",
  baseName: "Inner Fire",
  description:
    "Ignite the fires of hate in an enemy's heart, dealing 1079 Flame Damage and taunting them to attack you for 15 seconds.\n\nUp to 3 allies targeting the taunted enemy can activate the Radiate synergy, dealing 1344 Flame Damage to them over 3 seconds then an additional 2249 Flame Damage to them and other nearby enemies.",
  icon: "/esoui/art/icons/ability_undaunted_002_b.dds",
  esoSkillId: 43378,
  isMorph: true,
  learnedLevel: 3,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/guild-undaunted",
  skillType: "temper-skill-type/active",
  hashPlace: 689,
  createdAt: "2026-05-26T02:59:07.598Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.048019005 MaxStat + 0.504200069 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Flame, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 15 seconds (Constant)",
    "<<3>> = Radiate (Constant)",
    "<<4>> = 0.0199778 MaxStat + 0.210472 MaxPower - 1.95606 (Ultimate, ratio = 10.54, Dmg, Flame, SingleTarget, DOT, 2s duration, 1s tick, R2 = 0.999993)",
    "<<5>> = 3 seconds (Constant)",
    "<<6>> = 0.0999631 MaxStat + 1.0499 MaxPower - 0.231961 (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
