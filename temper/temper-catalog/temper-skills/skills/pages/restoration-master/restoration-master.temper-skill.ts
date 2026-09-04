import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const restorationMaster = {
  id: "019e6226-010e-7c46-a00f-203ffd58ccca",
  pageTypeSlug: "temper-skill",
  slug: "restoration-master",
  title: "Restoration Master",
  key: "restoration-master",
  baseName: "Restoration Master",
  description: '"Increases healing with Restoration Staff spells by 5%."',
  icon: "/esoui/art/icons/ability_templar_012.dds",
  esoSkillId: 45524,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-restoration-staff",
  skillType: "passive",
  subcategoryId: "weapon-restoration-staff",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
