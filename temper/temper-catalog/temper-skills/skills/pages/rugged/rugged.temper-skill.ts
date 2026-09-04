import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rugged = {
  id: "019e624a-12de-712a-877f-21b25fc5ca7f",
  pageTypeSlug: "temper-skill",
  slug: "rugged",
  title: "Rugged",
  key: "rugged",
  baseName: "Rugged",
  description: '"Increases your Physical and Spell Resistance by 2600."',
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 45306,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-nord-skills",
  skillType: "passive",
  subcategoryId: "racial-nord-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
