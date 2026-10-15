import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const takeFlight32719 = {
  id: "019e6f53-a81d-7295-a563-ffe6be1fc181",
  type: "page-type/temper-skill",
  slug: "take-flight-32719",
  title: "Take Flight",
  key: "take-flight-32719",
  baseName: "Dragon Leap",
  description:
    "Launch yourself at an enemy, dealing |cffffff15079|r Flame Damage to all enemies in the area, knocking them back |cffffff4|r meters, and stunning them for |cffffff2|r seconds. If the target is a monster they are instead knocked into the air and stunned for |cffffff3|r seconds.\n\nUpon activation you are filled with draconic fury for |cffffff15|r seconds, increasing your damage done by |cffffff10|r%. This effect's potency doubles against monsters.",
  icon: "/esoui/art/icons/ability_dragonknight_009_b.dds",
  esoSkillId: 32719,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1326,
  createdAt: "2026-05-28T16:03:34.045Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.17667 MaxStat + 1.85504 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 4 meters (Constant)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = 3 seconds (Constant)",
    "<<5>> = 15 seconds (Constant)",
    "<<6>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
