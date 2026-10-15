import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const poisonInjection38660 = {
  id: "019e6f53-a515-7fa4-aa61-3cebd1b2ece0",
  type: "page-type/temper-skill",
  slug: "poison-injection-38660",
  title: "Poison Injection",
  key: "poison-injection-38660",
  baseName: "Poison Arrow",
  description:
    "Shoot an arrow coated in Baandari poison at an enemy, dealing |cffffff4038|r Poison Damage and an additional |cffffff11420|r Poison Damage over |cffffff20|r seconds.\n\nDeals up to |cffffff120|r% more damage to enemies under |cffffff50|r% Health.",
  icon: "/esoui/art/icons/ability_bow_002_b.dds",
  esoSkillId: 38660,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 38,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 903,
  createdAt: "2026-05-28T16:03:33.269Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.05165 MaxStat + 0.542325 MaxPower (Ultimate, ratio = 10.50, Dmg, Poison, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.0156088 MaxStat + 0.162726 MaxPower - 2.99952 (Ultimate, ratio = 10.43, Dmg, Poison, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999995)",
    "<<3>> = 20 seconds (Constant)",
    "<<4>> = 105 (Constant)",
    "<<5>> = 50 (Constant)",
  ],
} as const satisfies TemperSkill
