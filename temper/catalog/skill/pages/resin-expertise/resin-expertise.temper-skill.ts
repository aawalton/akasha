import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const resinExpertise = {
  id: "019e6224-ccab-7fcd-8779-a90561505b59",
  type: "page-type/temper-skill",
  slug: "resin-expertise",
  title: "Resin Expertise",
  key: "resin-expertise",
  baseName: "Resin Expertise",
  description: "More than doubles the chances to improve items with resins.",
  icon: "/esoui/art/icons/ability_tradecraft_001.dds",
  esoAbilityId: 48177,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-woodworking",
  skillType: "temper-skill-type/passive",
  hashPlace: 1033,
  createdAt: "2026-05-26T02:37:19.403Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
