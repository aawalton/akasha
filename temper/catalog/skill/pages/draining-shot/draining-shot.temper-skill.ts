import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const drainingShot = {
  id: "019e6226-00e7-7343-91cf-b4af0658144c",
  type: "page-type/temper-skill",
  slug: "draining-shot",
  title: "Draining Shot",
  key: "draining-shot",
  baseName: "Scatter Shot",
  description:
    "Blast an enemy with an enchanted arrow, dealing 1393 Physical Damage and reducing their Movement Speed by 60% for 3 seconds.\n\nIf the enemy is hit, you heal for 2399.",
  icon: "/esoui/art/icons/ability_bow_004_a.dds",
  esoSkillId: 40883,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 385,
  createdAt: "2026-05-26T02:38:38.311Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 60% (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 0.106622 MaxStat + 1.12092 MaxPower - 1.569 (Ultimate, ratio = 10.51, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
