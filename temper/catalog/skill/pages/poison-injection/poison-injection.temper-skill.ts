import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const poisonInjection = {
  id: "019e6226-0103-7162-b4b7-cb92f6d006e0",
  type: "page-type/temper-skill",
  slug: "poison-injection",
  title: "Poison Injection",
  key: "poison-injection",
  baseName: "Poison Arrow",
  description:
    "Shoot an arrow coated in Baandari poison at an enemy, dealing 1161 Poison Damage and an additional 3470 Poison Damage over 20 seconds.\n\nDeals up to 120% more damage to enemies under 50% Health.",
  icon: "/esoui/art/icons/ability_bow_002_b.dds",
  esoSkillId: 40842,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 902,
  createdAt: "2026-05-26T02:38:38.339Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Poison, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Poison, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 120 (Constant)",
    "<<5>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
