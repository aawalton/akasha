import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const keenEyeCloth47860 = {
  id: "019e6f53-a399-7688-944d-2582001140b7",
  type: "page-type/temper-skill",
  slug: "keen-eye-cloth-47860",
  title: "Keen Eye: Cloth",
  key: "keen-eye-cloth-47860",
  baseName: "Keen Eye: Cloth",
  description:
    "Fibrous plants in the world will be easier to see when you are |cffffff20|r meters or closer.",
  icon: "/esoui/art/icons/ability_smith_002.dds",
  esoSkillId: 47860,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/craft-clothing",
  skillType: "temper-skill-type/passive",
  hashPlace: 705,
  createdAt: "2026-05-28T16:03:32.889Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 20 meters (Constant)"],
} as const satisfies TemperSkill
