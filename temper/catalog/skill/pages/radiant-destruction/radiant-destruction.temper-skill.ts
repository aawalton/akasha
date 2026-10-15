import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantDestruction = {
  id: "019e6f53-a57f-7267-b297-c1ecb4ccdc6d",
  type: "page-type/temper-skill",
  slug: "radiant-destruction",
  title: "Radiant Destruction",
  key: "radiant-destruction",
  baseName: "Radiant Destruction",
  description:
    "Burn an enemy with a ray of holy fire, dealing |cffffff25200|r Magic Damage over |cffffff3.8|r seconds. Deals up to |cffffff500|r% more damage to enemies below |cffffff33|r% Health.\n\nThis ability is considered direct damage.",
  icon: "/esoui/art/icons/ability_templar_over_exposure.dds",
  esoSkillId: 63029,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 959,
  createdAt: "2026-05-28T16:03:33.375Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0520522 MaxStat + 0.545317 MaxPower - 0.13687 (Ultimate, ratio = 10.48, Dmg, Magic, SingleTarget, Direct, 3.5s duration, 0.7s tick, R2 = 1)",
    "<<2>> = 3.8 seconds (Constant)",
    "<<3>> = 500 (Constant)",
    "<<4>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
