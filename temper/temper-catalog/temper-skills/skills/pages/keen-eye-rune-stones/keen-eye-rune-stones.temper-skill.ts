import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeRuneStones = {
  id: "019e6224-cc9d-7ba2-8d50-72d69b58bd94",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-rune-stones",
  title: "Keen Eye: Rune Stones",
  key: "keen-eye-rune-stones",
  baseName: "Keen Eye: Rune Stones",
  description: '"Runes in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47853,
  isMorph: false,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-enchanting",
  skillType: "passive",
  subcategoryId: "craft-enchanting",
} as const satisfies TemperSkill
