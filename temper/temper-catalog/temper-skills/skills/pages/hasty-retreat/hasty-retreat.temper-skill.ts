import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hastyRetreat = {
  id: "019e6226-00f6-7d48-8d2c-f7903f8e0fa0",
  pageTypeSlug: "temper-skill",
  slug: "hasty-retreat",
  title: "Hasty Retreat",
  key: "hasty-retreat",
  baseName: "Hasty Retreat",
  description:
    '"Grants you Major Expedition for 4 seconds after you use Roll Dodge.\\n\\nMajor Expedition increases your Movement Speed by 30%."',
  icon: "/esoui/art/icons/ability_dragonknight_029.dds",
  esoSkillId: 45498,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "weapon-bow",
  skillType: "passive",
  subcategoryId: "weapon-bow",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
