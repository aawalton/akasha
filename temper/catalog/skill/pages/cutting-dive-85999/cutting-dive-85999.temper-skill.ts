import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cuttingDive85999 = {
  id: "019e6f53-a05a-762e-9d84-998a5bc305db",
  type: "page-type/temper-skill",
  slug: "cutting-dive-85999",
  title: "Cutting Dive",
  key: "cutting-dive-85999",
  baseName: "Dive",
  description:
    "Command a cliff racer to dive bomb an enemy, dealing |cffffff7269|r Bleed Damage immediately and then causing them to bleed for |cffffff7060|r Bleed Damage over |cffffff10|r seconds.\n\nIf you are more than |cffffff7|r meters away from the target, you set them Off Balance for |cffffff7|r seconds.",
  icon: "/esoui/art/icons/ability_warden_013_b.dds",
  esoSkillId: 85999,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 287,
  createdAt: "2026-05-28T16:03:32.058Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09297 MaxStat + 0.976185 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.00928892 MaxStat + 0.0965292 MaxPower - 1.97641 (Ultimate, ratio = 10.39, Dmg, Bleed, SingleTarget, DOT, 9.1s duration, 1s tick, R2 = 0.999993)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
