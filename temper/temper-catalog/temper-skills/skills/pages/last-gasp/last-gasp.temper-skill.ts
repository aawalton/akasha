import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lastGasp = {
  id: "019e6245-a6b8-7b47-8801-947c2f97b365",
  pageTypeSlug: "temper-skill",
  slug: "last-gasp",
  title: "Last Gasp",
  key: "last-gasp",
  baseName: "Last Gasp",
  description: '"Increase your Max Health by 2412."',
  icon: "/esoui/art/icons/passive_necromancer_008.dds",
  esoSkillId: 116272,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
