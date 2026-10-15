import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const structuredEntropy40452 = {
  id: "019e6f53-a7ca-79db-9dda-51ece975d821",
  type: "page-type/temper-skill",
  slug: "structured-entropy-40452",
  title: "Structured Entropy",
  key: "structured-entropy-40452",
  baseName: "Entropy",
  description:
    "Bind an enemy with chaotic magic, dealing |cffffff15235|r Magic Damage over |cffffff20|r seconds, and healing you for |cffffff1371|r every |cffffff2|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_004_b.dds",
  esoSkillId: 40452,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 1280,
  createdAt: "2026-05-28T16:03:33.962Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 0.0187221 MaxStat + 0.197107 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Heal, SingleTarget, Direct, 2s tick, R2 = 0.999998)",
    "<<4>> = 2 seconds (Constant)",
  ],
} as const satisfies TemperSkill
