import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scatterShot = {
  id: "019e6f53-a6c2-724a-b271-7efdb003bbe8",
  pageTypeSlug: "temper-skill",
  slug: "scatter-shot",
  title: "Scatter Shot",
  key: "scatter-shot",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing |cffffff4846|r Physical Damage, knocking them back |cffffff8|r meters."',
  icon: "/esoui/art/icons/ability_bow_004.dds",
  esoSkillId: 28879,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
