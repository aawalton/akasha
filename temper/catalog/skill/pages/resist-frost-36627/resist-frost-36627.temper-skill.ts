import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resistFrost36627 = {
  id: "019e6f53-a614-79bc-871b-694d09971562",
  type: "page-type/temper-skill",
  slug: "resist-frost-36627",
  title: "Resist Frost",
  key: "resist-frost-36627",
  baseName: "Resist Frost",
  description: "Increases your Max Health by |cffffff333|r and Frost Resistance by |cffffff1540|r.",
  icon: "/esoui/art/icons/ability_sorcerer_012.dds",
  esoSkillId: 36627,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/racial-nord-skills",
  skillType: "temper-skill-type/passive",
  hashPlace: 1039,
  createdAt: "2026-05-28T16:03:33.524Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: ["<<1>> = 333 (Constant)", "<<2>> = 1540 (Constant)"],
} as const satisfies TemperSkill
