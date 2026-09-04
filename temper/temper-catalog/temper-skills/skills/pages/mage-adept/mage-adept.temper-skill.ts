import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const mageAdept = {
  id: "019e6238-c2e5-7387-8293-0b8588887e7e",
  pageTypeSlug: "temper-skill",
  slug: "mage-adept",
  title: "Mage Adept",
  key: "mage-adept",
  baseName: "Mage Adept",
  description: '"Reduces the Magicka and Health cost of your Mages Guild abilities by 15%."',
  icon: "/esoui/art/icons/ability_sorcerer_045.dds",
  esoSkillId: 45601,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "guild-mages-guild",
  skillType: "passive",
  subcategoryId: "guild-mages-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
