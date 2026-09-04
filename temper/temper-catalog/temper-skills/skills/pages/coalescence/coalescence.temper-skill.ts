import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const coalescence = {
  id: "019e6251-4c9c-7ec4-b3ad-07230d75a11c",
  pageTypeSlug: "temper-skill",
  slug: "coalescence",
  title: "Coalescence",
  key: "coalescence",
  baseName: "Coalescence",
  description:
    "\"Unites a hexagonal cluster of facets in the Antiquarian's Eye, converting the symbols to match that of the central facet.\\n\\nNew Effect: The ability's range increases by one facet, creating a snowflake-like pattern.\\n\\nConsumes 1 Magicka Charge.\"",
  icon: "/esoui/art/icons/ability_scrying_02.dds",
  esoSkillId: 139306,
  isMorph: false,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
