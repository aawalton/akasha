import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scaldingRune = {
  id: "019e6238-c307-786c-b54c-96f81591e694",
  type: "page-type/temper-skill",
  slug: "scalding-rune",
  title: "Scalding Rune",
  key: "scalding-rune",
  baseName: "Fire Rune",
  description:
    "Inscribe a rune of cosmic fire on the earth, which takes 2 seconds to arm and lasts for 20 seconds.\n\nWhen triggered, the rune blasts all enemies in the target area for 2323 Flame Damage and an additional 2871 Flame Damage over 22 seconds.",
  icon: "/esoui/art/icons/ability_mageguild_001_b.dds",
  esoSkillId: 42349,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1133,
  createdAt: "2026-05-26T02:59:07.655Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.10323 MaxStat + 1.08494 MaxPower - 0.77399 (Ultimate, ratio = 10.51, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 0.0116459 MaxStat + 0.121782 MaxPower - 0.390109 (Ultimate, ratio = 10.46, Dmg, Flame, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999975)",
    "<<4>> = 22 seconds (Constant)",
  ],
} as const satisfies TemperSkill
