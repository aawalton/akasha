import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const keenEyeDigSites = {
  id: "019e6251-4cc8-7e3f-9853-4a52b38f5675",
  type: "page-type/temper-skill",
  slug: "keen-eye-dig-sites",
  title: "Keen Eye: Dig Sites",
  key: "keen-eye-dig-sites",
  baseName: "Keen Eye: Dig Sites",
  description: "Antiquity Dig Sites will be easier to see when you are 30 meters or closer.",
  icon: "/esoui/art/icons/ability_scrying_08b.dds",
  esoSkillId: 140174,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-excavation",
  skillType: "temper-skill-type/passive",
  hashPlace: 706,
  createdAt: "2026-05-26T03:25:55.784Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 30 meters (Constant)"],
} as const satisfies TemperSkill
