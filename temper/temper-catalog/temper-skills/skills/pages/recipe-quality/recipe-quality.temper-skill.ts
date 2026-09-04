import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const recipeQuality = {
  id: "019e6224-ccaa-7eb6-82de-439d9511642e",
  pageTypeSlug: "temper-skill",
  slug: "recipe-quality",
  title: "Recipe Quality",
  key: "recipe-quality",
  baseName: "Recipe Quality",
  description: '"Allows the use of Legendary (gold) Recipes."',
  icon: "/esoui/art/icons/ability_provisioner_006.dds",
  esoSkillId: 69953,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
