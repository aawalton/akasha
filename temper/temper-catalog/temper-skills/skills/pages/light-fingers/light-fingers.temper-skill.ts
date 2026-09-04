import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightFingers = {
  id: "019e6251-4ccc-7be6-86e9-25fb5d5198dc",
  pageTypeSlug: "temper-skill",
  slug: "light-fingers",
  title: "Light Fingers",
  key: "light-fingers",
  baseName: "Light Fingers",
  description: '"Increases your chances of successfully Pickpocketing by 50%"',
  icon: "/esoui/art/icons/ability_legerdemain_lightfingers.dds",
  esoSkillId: 63806,
  isMorph: false,
  learnedLevel: 17,
  lineRankNeeded: 17,
  morphIndex: 0,
  rank: 4,
  skillLineId: "world-legerdemain",
  skillType: "passive",
  subcategoryId: "world-legerdemain",
} as const satisfies TemperSkill
