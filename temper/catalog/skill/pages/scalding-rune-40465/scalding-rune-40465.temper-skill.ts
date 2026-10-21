import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scaldingRune40465 = {
  id: "019e6f53-a6bb-78b6-a9c0-332fd77d17a2",
  type: "page-type/temper-skill",
  slug: "scalding-rune-40465",
  title: "Scalding Rune",
  key: "scalding-rune-40465",
  baseName: "Fire Rune",
  description:
    "Inscribe a rune of cosmic fire on the earth, which takes |cffffff2|r seconds to arm and lasts for |cffffff20|r seconds.\n\nWhen triggered, the rune blasts all enemies in the target area for |cffffff8533|r Flame Damage and an additional |cffffff9427|r Flame Damage over |cffffff22|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_001_b.dds",
  esoSkillId: 40465,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1134,
  createdAt: "2026-05-28T16:03:33.691Z",
  updatedAt: "2026-10-21T05:07:25.675Z",
  equations: [
    "<<5>> = 2 seconds (Constant)",
    "<<4>> = 22 seconds (Constant)",
    "<<2>> = 0.10330089 MaxStat + 1.0846593 MaxPower (Ultimate, Dmg, Flame, AOE, Direct, Melee)",
    "<<3>> = 0.0112585 MaxStat + 0.118067 MaxPower - 0.102176 (Ultimate, ratio = 10.49, Dmg, Flame, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.99999)",
    "<<1>> = 24 seconds (Constant)",
  ],
} as const satisfies TemperSkill
