import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const giftOfMagnus = {
  id: "019e624a-12ca-732b-bda2-e3a5e7e6bf79",
  pageTypeSlug: "temper-skill",
  slug: "gift-of-magnus",
  title: "Gift of Magnus",
  key: "gift-of-magnus",
  baseName: "Gift of Magnus",
  description: '"Increases your Max Magicka by 2000."',
  icon: "/esoui/art/icons/ability_armor_004.dds",
  esoSkillId: 45260,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "racial-breton-skills",
  skillType: "passive",
  subcategoryId: "racial-breton-skills",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
