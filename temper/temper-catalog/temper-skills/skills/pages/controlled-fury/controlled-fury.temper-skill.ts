import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const controlledFury = {
  id: "019e6226-00dc-7b67-9423-8aa2a95ded69",
  pageTypeSlug: "temper-skill",
  slug: "controlled-fury",
  title: "Controlled Fury",
  key: "controlled-fury",
  baseName: "Controlled Fury",
  description: '"Reduces the Stamina cost of Dual Wield abilities by 15%."',
  icon: "/esoui/art/icons/ability_weapon_018.dds",
  esoSkillId: 45478,
  isMorph: false,
  learnedLevel: 34,
  lineRankNeeded: 34,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-dual-wield",
  skillType: "passive",
  subcategoryId: "weapon-dual-wield",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
