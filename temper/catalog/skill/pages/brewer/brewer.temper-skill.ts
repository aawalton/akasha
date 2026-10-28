import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const brewer = {
  id: "019e6224-cc88-7e91-b5b1-737092f32a87",
  type: "page-type/temper-skill",
  slug: "brewer",
  title: "Brewer",
  key: "brewer",
  baseName: "Brewer",
  description: "Creates 3 extra servings for each drink recipe made.",
  icon: "/esoui/art/icons/ability_provisioner_003.dds",
  esoAbilityId: 44624,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 9,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-provisioning",
  skillType: "temper-skill-type/passive",
  hashPlace: 167,
  createdAt: "2026-05-26T02:37:19.368Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
