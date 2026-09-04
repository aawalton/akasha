import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const magnumShot38672 = {
  id: "019e6f53-a44f-7413-ace3-a6da7ce30522",
  pageTypeSlug: "temper-skill",
  slug: "magnum-shot-38672",
  title: "Magnum Shot",
  key: "magnum-shot-38672",
  baseName: "Scatter Shot",
  description:
    '"Blast an enemy with an explosive arrow, dealing |cffffff6007|r Physical Damage and knocking them back |cffffff8|r meters."',
  icon: "/esoui/art/icons/ability_bow_004_b.dds",
  esoSkillId: 38672,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 14,
  skillLineId: "weapon-bow",
  skillType: "active",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
