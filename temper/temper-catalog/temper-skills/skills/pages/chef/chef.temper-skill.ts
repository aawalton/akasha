import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const chef = {
  id: "019e6224-cc8e-720f-b708-89c452c66b15",
  pageTypeSlug: "temper-skill",
  slug: "chef",
  title: "Chef",
  key: "chef",
  baseName: "Chef",
  description: '"Creates 3 extra servings for each food recipe made."',
  icon: "/esoui/art/icons/ability_provisioner_002.dds",
  esoSkillId: 44619,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-provisioning",
  skillType: "passive",
  subcategoryId: "craft-provisioning",
} as const satisfies TemperSkill
