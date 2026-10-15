import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const tough50903 = {
  id: "019e6f53-a84e-7718-a437-1afdef525150",
  type: "page-type/temper-skill",
  slug: "tough-50903",
  title: "Tough",
  key: "tough-50903",
  baseName: "Tough",
  description: "Increases your Max Health by |cffffff600|r.",
  icon: "/esoui/art/icons/ability_dragonknight_020.dds",
  esoSkillId: 50903,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-imperial-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1355,
  createdAt: "2026-05-28T16:03:34.094Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 600 (Constant)"],
} as const satisfies TemperSkill
