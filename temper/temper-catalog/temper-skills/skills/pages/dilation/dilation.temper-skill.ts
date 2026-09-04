import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dilation = {
  id: "019e6251-4ca8-7260-a022-d7d77719c5d0",
  pageTypeSlug: "temper-skill",
  slug: "dilation",
  title: "Dilation",
  key: "dilation",
  baseName: "Dilation",
  description:
    '"Claim all facets of the selected type that touch your area of control, as well as matching facets directly adjacent.\\n\\nNew Effect: Dilation now claims ALL contiguous facets of the same type.\\n\\nConsumes 1 Magicka Charge."',
  icon: "/esoui/art/icons/ability_scrying_04.dds",
  esoSkillId: 139308,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
