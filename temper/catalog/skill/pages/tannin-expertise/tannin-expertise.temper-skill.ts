import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const tanninExpertise = {
  id: "019e6224-ccb2-760b-823a-deef5566640f",
  type: "page-type/temper-skill",
  slug: "tannin-expertise",
  title: "Tannin Expertise",
  key: "tannin-expertise",
  baseName: "Tannin Expertise",
  description: "More than doubles the chances to improve items with tannins.",
  icon: "/esoui/art/icons/ability_tradecraft_004.dds",
  esoAbilityId: 48198,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-clothing",
  skillType: "temper-skill-type/passive",
  hashPlace: 1329,
  createdAt: "2026-05-26T02:37:19.410Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
