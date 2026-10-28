import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const scry = {
  id: "019e6251-4ce6-7796-86c5-6618113274d2",
  type: "page-type/temper-skill",
  slug: "scry",
  title: "Scry",
  key: "scry",
  baseName: "Scry",
  description:
    "Adds the selected contiguous group of facets to your area of control.\n\nConsumes 1 turn.",
  icon: "/esoui/art/icons/ability_scrying_01.dds",
  esoAbilityId: 139942,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/world-scrying",
  skillType: "temper-skill-type/passive",
  hashPlace: 1143,
  createdAt: "2026-05-26T03:25:55.814Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
