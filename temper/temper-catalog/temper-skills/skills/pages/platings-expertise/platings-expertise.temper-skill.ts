import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const platingsExpertise = {
  id: "019e6224-cca8-733f-bd8f-74945156235d",
  pageTypeSlug: "temper-skill",
  slug: "platings-expertise",
  title: "Platings Expertise",
  key: "platings-expertise",
  baseName: "Platings Expertise",
  description: '"More than doubles the chances of improving items with platings."',
  icon: "/esoui/art/icons/passive_platingexpertise.dds",
  esoSkillId: 103648,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
