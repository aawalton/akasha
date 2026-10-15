import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const entropy = {
  id: "019e6f53-a194-765d-94b1-fa934697f56c",
  type: "page-type/temper-skill",
  slug: "entropy",
  title: "Entropy",
  key: "entropy",
  baseName: "Entropy",
  description:
    "Bind an enemy with chaotic magic, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds.",
  icon: "/esoui/art/icons/ability_mageguild_004.dds",
  esoSkillId: 28567,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/guild-mages-guild",
  skillType: "temper-skill-type/active",
  hashPlace: 447,
  createdAt: "2026-05-28T16:03:32.372Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0182227 MaxStat + 0.19082 MaxPower - 1.34458 (Ultimate, ratio = 10.47, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999996)",
    "<<2>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
