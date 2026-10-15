import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceScatterShot = {
  id: "019e6f53-a979-77c4-a068-237ac2c7a694",
  type: "page-type/temper-skill",
  slug: "vengeance-scatter-shot",
  title: "Vengeance Scatter Shot",
  key: "vengeance-scatter-shot",
  baseName: "Vengeance Scatter Shot",
  description:
    "Blast an enemy with an explosive arrow, dealing |cffffff4846|r Physical Damage, knocking them back |cffffff8|r meters.",
  icon: "/esoui/art/icons/ability_bow_004.dds",
  esoSkillId: 241261,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1549,
  createdAt: "2026-05-28T16:03:34.393Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
