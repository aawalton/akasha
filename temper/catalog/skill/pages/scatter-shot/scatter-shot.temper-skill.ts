import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scatterShot = {
  id: "019e6f53-a6c2-724a-b271-7efdb003bbe8",
  type: "page-type/temper-skill",
  slug: "scatter-shot",
  title: "Scatter Shot",
  key: "scatter-shot",
  baseName: "Scatter Shot",
  description:
    "Blast an enemy with an explosive arrow, dealing |cffffff4846|r Physical Damage, knocking them back |cffffff8|r meters.",
  icon: "/esoui/art/icons/ability_bow_004.dds",
  esoSkillId: 28879,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/active",
  hashPlace: 1137,
  createdAt: "2026-05-28T16:03:33.698Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06 MaxStat + 0.63 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Physical, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
