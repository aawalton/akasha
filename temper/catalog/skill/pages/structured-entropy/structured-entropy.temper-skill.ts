import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const structuredEntropy = {
  id: "019e6238-c31c-72d5-af6b-68850177dead",
  type: "page-type/temper-skill",
  slug: "structured-entropy",
  title: "Structured Entropy",
  key: "structured-entropy",
  baseName: "Entropy",
  description:
    "Bind an enemy with chaotic magic, dealing 4642 Magic Damage over 20 seconds, and healing you for 435 every 2 seconds.",
  icon: "/esoui/art/icons/ability_mageguild_004_b.dds",
  esoSkillId: 42240,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1279,
  createdAt: "2026-05-26T02:59:07.676Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 0.0193549 MaxStat + 0.203761 MaxPower - 1.01347 (Ultimate, ratio = 10.53, Heal, SingleTarget, Direct, 2s tick, R2 = 0.999997)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
