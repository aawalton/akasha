import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeJewelry = {
  id: "019e6224-cc9a-786c-bc2f-1610906e3645",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-jewelry",
  title: "Keen Eye: Jewelry",
  key: "keen-eye-jewelry",
  baseName: "Keen Eye: Jewelry",
  description:
    '"Jewelry Seams in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 103639,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
