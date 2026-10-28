import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const connoisseur = {
  id: "019e6224-cc91-7974-8f1c-615c1ec1cd20",
  type: "page-type/temper-skill",
  slug: "connoisseur",
  title: "Connoisseur",
  key: "connoisseur",
  baseName: "Connoisseur",
  description: "Adds 20 minutes to the duration of any consumed drink.",
  icon: "/esoui/art/icons/ability_provisioner_005.dds",
  esoAbilityId: 44615,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 3,
  skillLineId: "temper-skill-line/craft-provisioning",
  skillType: "temper-skill-type/passive",
  hashPlace: 241,
  createdAt: "2026-05-26T02:37:19.377Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies TemperSkill
