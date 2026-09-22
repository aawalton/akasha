import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const psychicLesion = {
  id: "019e6245-a6f3-72fc-8dce-37e62a3e03f8",
  type: "page-type/temper-skill",
  slug: "psychic-lesion",
  title: "Psychic Lesion",
  key: "psychic-lesion",
  baseName: "Psychic Lesion",
  description:
    '"Your attacks wound the mind with heretical knowledge, increasing damage dealt by Status Effects by 15% and Status Effect Chance by 55%."',
  icon: "/esoui/art/icons/passive_arcanist_03.dds",
  esoSkillId: 184873,
  isMorph: false,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
