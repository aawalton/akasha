import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const keenEyeTreasureChests = {
  id: "019e6251-4cca-7337-aa29-ddd45557d6e0",
  pageTypeSlug: "temper-skill",
  slug: "keen-eye-treasure-chests",
  title: "Keen Eye: Treasure Chests",
  key: "keen-eye-treasure-chests",
  baseName: "Keen Eye: Treasure Chests",
  description: '"Treasure Chests will be easier to see when you are 30 meters or closer."',
  icon: "/esoui/art/icons/ability_scrying_08b.dds",
  esoSkillId: 139772,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-excavation",
  skillType: "passive",
  subcategoryId: "world-excavation",
} as const satisfies TemperSkill
