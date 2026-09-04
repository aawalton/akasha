import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deathGleaning = {
  id: "019e6245-a643-7c79-a71d-f2858f9aff5e",
  pageTypeSlug: "temper-skill",
  slug: "death-gleaning",
  title: "Death Gleaning",
  key: "death-gleaning",
  baseName: "Death Gleaning",
  description:
    '"Whenever an enemy you are in combat with dies within 28 meters of you, restore 666 Magicka and Stamina."',
  icon: "/esoui/art/icons/passive_necromancer_005.dds",
  esoSkillId: 116235,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
