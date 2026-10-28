import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scriersPatience = {
  id: "019e6251-4ce5-7238-ba7a-e02771800bf0",
  type: "page-type/temper-skill",
  slug: "scriers-patience",
  title: "Scrier's Patience",
  key: "scriers-patience",
  baseName: "Scrier's Patience",
  description: "Grants you two additional turns of Scrying.",
  icon: "/esoui/art/icons/ability_scrying_06b.dds",
  esoAbilityId: 139779,
  isMorph: false,
  learnedLevel: 5,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-scrying",
  skillType: "temper-skill-type/passive",
  hashPlace: 1142,
  createdAt: "2026-05-26T03:25:55.813Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
