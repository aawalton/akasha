import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hideousClarity = {
  id: "019e6245-a6a6-701d-810e-ce8c68fde0c3",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/arcanist-curative-runeforms",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
} as const satisfies TemperSkill
