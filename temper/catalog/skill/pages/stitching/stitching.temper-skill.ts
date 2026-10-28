import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const stitching = {
  id: "019e6224-ccaf-7da2-a062-472143fb67fb",
  type: "page-type/temper-skill",
  slug: "stitching",
  title: "Stitching",
  key: "stitching",
  baseName: "Stitching",
  description:
    "Reduces research times by 25%, limits research time to 30 days, and allows the research of three items at once.",
  icon: "/esoui/art/icons/crafting_light_armor_component_004.dds",
  esoAbilityId: 58782,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/craft-clothing",
  skillType: "temper-skill-type/passive",
  hashPlace: 1273,
  createdAt: "2026-05-26T02:37:19.407Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
