import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const disdainHarm = {
  id: "019e6245-a656-7a64-9fc8-a7415de6e605",
  pageTypeSlug: "temper-skill",
  slug: "disdain-harm",
  title: "Disdain Harm",
  key: "disdain-harm",
  baseName: "Disdain Harm",
  description:
    '"Reduce the damage you take from damage over time abilities by 15% while you have a Bone Tyrant ability active."',
  icon: "/esoui/art/icons/passive_necromancer_006.dds",
  esoSkillId: 116240,
  isMorph: false,
  learnedLevel: 27,
  lineRankNeeded: 27,
  morphIndex: 0,
  rank: 2,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "passive",
  subcategoryId: "necromancer-bone-tyrant",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
