import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const keenEyeCloth = {
  id: "019e6224-cc99-7448-8f88-582c1d81fc53",
  type: "page-type/temper-skill",
  slug: "keen-eye-cloth",
  title: "Keen Eye: Cloth",
  key: "keen-eye-cloth",
  baseName: "Keen Eye: Cloth",
  description:
    '"Fibrous plants in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47862,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-clothing",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
