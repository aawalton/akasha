import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeReagents = {
  id: "019e6224-cc9c-7aa7-8faf-c41df57dd4eb",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-reagents",
  title: "Keen Eye: Reagents",
  key: "keen-eye-reagents",
  baseName: "Keen Eye: Reagents",
  description:
    '"Herbs and fungi in the world will be easier to see when you are 40 meters or closer."',
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47842,
  isMorph: false,
  learnedLevel: 17,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-alchemy",
  skillType: "passive",
  subcategoryId: "craft-alchemy",
} as const satisfies TemperSkill
