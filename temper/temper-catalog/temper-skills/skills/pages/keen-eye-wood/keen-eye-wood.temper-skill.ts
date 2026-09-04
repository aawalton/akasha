import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeWood = {
  id: "019e6224-cc9e-7cbf-aead-a20c207a8b0c",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-wood",
  title: "Keen Eye: Wood",
  key: "keen-eye-wood",
  baseName: "Keen Eye: Wood",
  description: '"Wood in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47859,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
