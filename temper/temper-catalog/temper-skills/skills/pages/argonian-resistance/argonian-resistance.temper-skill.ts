import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const argonianResistance = {
  id: "019e624a-12be-716e-bbbd-b87a0f0f6e92",
  pageTypeSlug: "temper-skill",
  slug: "argonian-resistance",
  title: "Argonian Resistance",
  key: "argonian-resistance",
  baseName: "Argonian Resistance",
  description:
    '"Increases your Max Health by 1000 and your Disease and Poison Resistance by 2310."',
  icon: "/esoui/art/icons/ability_templar_022.dds",
  esoSkillId: 45255,
  isMorph: false,
  learnedLevel: 40,
  lineRankNeeded: 40,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-argonian-skills",
  skillType: "passive",
  subcategoryId: "racial-argonian-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
