import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const fortress = {
  id: "019e6226-00f5-735a-a4e2-5efcff7c22ed",
  pageTypeSlug: "temper-skill",
  slug: "fortress",
  title: "Fortress",
  key: "fortress",
  baseName: "Fortress",
  description:
    '"Reduces the Stamina cost of your One Hand and Shield abilities by 15% and reduces the cost of blocking by 36%."',
  icon: "/esoui/art/icons/ability_weapon_028.dds",
  esoSkillId: 45471,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "passive",
  subcategoryId: "weapon-one-hand-and-shield",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
