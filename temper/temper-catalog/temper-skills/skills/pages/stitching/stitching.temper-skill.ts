import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const stitching = {
  id: "019e6224-ccaf-7da2-a062-472143fb67fb",
  pageTypeSlug: "temper-skill",
  slug: "stitching",
  title: "Stitching",
  key: "stitching",
  baseName: "Stitching",
  description:
    '"Reduces research times by 25%, limits research time to 30 days, and allows the research of three items at once."',
  icon: "/esoui/art/icons/crafting_light_armor_component_004.dds",
  esoSkillId: 58782,
  isMorph: false,
  learnedLevel: 45,
  lineRankNeeded: 45,
  morphIndex: 0,
  rank: 4,
  skillLineId: "craft-clothing",
  skillType: "passive",
  subcategoryId: "craft-clothing",
} as const satisfies TemperSkill
