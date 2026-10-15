import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const keenEyeTreasureChests = {
  id: "019e6251-4cca-7337-aa29-ddd45557d6e0",
  type: "page-type/temper-skill",
  slug: "keen-eye-treasure-chests",
  title: "Keen Eye: Treasure Chests",
  key: "keen-eye-treasure-chests",
  baseName: "Keen Eye: Treasure Chests",
  description: "Treasure Chests will be easier to see when you are 30 meters or closer.",
  icon: "/esoui/art/icons/ability_scrying_08b.dds",
  esoSkillId: 139772,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-excavation",
  skillType: "temper-skill-type/passive",
  hashPlace: 716,
  createdAt: "2026-05-26T03:25:55.786Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 30 meters (Constant)"],
} as const satisfies TemperSkill
