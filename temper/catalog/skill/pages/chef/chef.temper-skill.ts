import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const chef = {
  id: "019e6224-cc8e-720f-b708-89c452c66b15",
  type: "page-type/temper-skill",
  slug: "chef",
  title: "Chef",
  key: "chef",
  baseName: "Chef",
  description: "Creates 3 extra servings for each food recipe made.",
  icon: "/esoui/art/icons/ability_provisioner_002.dds",
  esoAbilityId: 44619,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-provisioning",
  skillType: "temper-skill-type/passive",
  hashPlace: 208,
  createdAt: "2026-05-26T02:37:19.374Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
