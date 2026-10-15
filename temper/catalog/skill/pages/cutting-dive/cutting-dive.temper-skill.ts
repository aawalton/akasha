import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const cuttingDive = {
  id: "019e6245-a630-7152-902f-0304690923d2",
  type: "page-type/temper-skill",
  slug: "cutting-dive",
  title: "Cutting Dive",
  key: "cutting-dive",
  baseName: "Dive",
  description:
    "Command a cliff racer to dive bomb an enemy, dealing 2091 Bleed Damage immediately and then causing them to bleed for 2140 Bleed Damage over 10 seconds.\n\nIf you are more than 7 meters away from the target, you set them Off Balance for 7 seconds.",
  icon: "/esoui/art/icons/ability_warden_013_b.dds",
  esoSkillId: 86002,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/warden-animal-companions",
  skillType: "temper-skill-type/active",
  hashPlace: 286,
  createdAt: "2026-05-26T03:13:12.240Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.09297 MaxStat + 0.976185 MaxPower (Ultimate, ratio = 10.50, Dmg, Bleed, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 0.00954756 MaxStat + 0.100091 MaxPower - 2.63442 (Ultimate, ratio = 10.48, Dmg, Bleed, SingleTarget, DOT, 9.1s duration, 1s tick, R2 = 0.999978)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 7 seconds (Constant)",
  ],
} as const satisfies TemperSkill
