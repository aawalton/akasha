import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reusableParts = {
  id: "019e6245-a712-71dc-a8ef-da59c7f0eb8a",
  pageTypeSlug: "temper-skill",
  slug: "reusable-parts",
  title: "Reusable Parts",
  key: "reusable-parts",
  baseName: "Reusable Parts",
  description:
    '"When your Sacrificial Bones, Skeletal Mage, or Spirit Mender dies, the cost of your next Sacrificial Bones, Skeletal Mage, or Spirit Mender is reduced by 66%."',
  icon: "/esoui/art/icons/passive_necromancer_001.dds",
  esoSkillId: 116188,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-grave-lord",
  skillType: "passive",
  subcategoryId: "necromancer-grave-lord",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
