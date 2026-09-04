import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const brewer = {
  id: "019e6224-cc88-7e91-b5b1-737092f32a87",
  pageTypeSlug: "temper-skill",
  slug: "brewer",
  title: "Brewer",
  key: "brewer",
  baseName: "Brewer",
  description: '"Creates 3 extra servings for each drink recipe made."',
  icon: "/esoui/art/icons/ability_provisioner_003.dds",
  esoSkillId: 44624,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
