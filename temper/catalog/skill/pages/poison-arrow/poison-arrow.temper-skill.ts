import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const poisonArrow = {
  id: "019e6f53-a512-7745-9e73-92dbe61f3f29",
  type: "page-type/temper-skill",
  slug: "poison-arrow",
  title: "Poison Arrow",
  key: "poison-arrow",
  baseName: "Poison Arrow",
  description:
    "Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff4036|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_bow_002.dds",
  esoSkillId: 28869,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 901,
  createdAt: "2026-05-28T16:03:33.266Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05 MaxStat + 0.525 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Poison, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0150563 MaxStat + 0.157611 MaxPower - 2.12747 (Ultimate, ratio = 10.47, Dmg, Poison, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999993)",
    "<<3>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
