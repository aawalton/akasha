import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const dragonfireBreath = {
  id: "019e6f53-a0e6-7f97-8dbb-977c423edba3",
  type: "page-type/temper-skill",
  slug: "dragonfire-breath",
  title: "Dragonfire Breath",
  key: "dragonfire-breath",
  baseName: "Dragonfire Breath",
  description:
    "Exhale a blast of draconic fire in front of you, dealing |cffffff6400|r Flame Damage and an additional |cffffff9515|r Flame Damage over |cffffff10|r seconds to enemies in your path.",
  icon: "/esoui/art/icons/ability_dragonknight_004.dds",
  esoSkillId: 20917,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 380,
  createdAt: "2026-05-28T16:03:32.198Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0249954 MaxStat + 0.26217 MaxPower - 0.0301722 (Ultimate, ratio = 10.49, Dmg, Flame, SingleTarget, DOT, 8s duration, 2s tick, R2 = 0.999996)",
    "<<3>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
