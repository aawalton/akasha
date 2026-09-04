import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chemistry = {
  id: "019e6224-cc90-717f-99cc-19e337308cbd",
  pageTypeSlug: "temper-skill",
  slug: "chemistry",
  title: "Chemistry",
  key: "chemistry",
  baseName: "Chemistry",
  description: '"Produces 3 extra potions or 12 extra poisons per crafting attempt."',
  icon: "/esoui/art/icons/ability_alchemy_006.dds",
  esoSkillId: 45579,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
