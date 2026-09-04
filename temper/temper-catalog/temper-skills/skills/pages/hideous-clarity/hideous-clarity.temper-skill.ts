import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hideousClarity = {
  id: "019e6245-a6a6-701d-810e-ce8c68fde0c3",
  pageTypeSlug: "temper-skill",
  slug: "hideous-clarity",
  title: "Hideous Clarity",
  key: "hideous-clarity",
  baseName: "Hideous Clarity",
  description:
    '"You\'ve stared too long into the abyss. When you generate Crux, you restore 225 Magicka and Stamina."',
  icon: "/esoui/art/icons/passive_arcanist_10.dds",
  esoSkillId: 185243,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "passive",
  subcategoryId: "arcanist-curative-runeforms",
  status: "unsupported",
} as const satisfies TemperSkill
