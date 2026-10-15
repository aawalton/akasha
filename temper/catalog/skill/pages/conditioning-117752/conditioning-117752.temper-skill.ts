import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const conditioning117752 = {
  id: "019e6f53-a013-7f7f-9bac-ab27ed4aeb1e",
  type: "page-type/temper-skill",
  slug: "conditioning-117752",
  title: "Conditioning",
  key: "conditioning-117752",
  baseName: "Conditioning",
  description: "Increases your Max Stamina by |cffffff600|r.",
  icon: "/esoui/art/icons/ability_dragonknight_021.dds",
  esoSkillId: 117752,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 10,
  skillLineId: "temper-skill-line/racial-redguard-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 239,
  createdAt: "2026-05-28T16:03:31.987Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 600 (Constant)"],
} as const satisfies TemperSkill
