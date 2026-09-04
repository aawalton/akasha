import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const scry = {
  id: "019e6251-4ce6-7796-86c5-6618113274d2",
  pageTypeSlug: "temper-skill",
  slug: "scry",
  title: "Scry",
  key: "scry",
  baseName: "Scry",
  description:
    '"Adds the selected contiguous group of facets to your area of control.\\n\\nConsumes 1 turn."',
  icon: "/esoui/art/icons/ability_scrying_01.dds",
  esoSkillId: 139942,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-scrying",
  skillType: "passive",
  subcategoryId: "world-scrying",
} as const satisfies TemperSkill
