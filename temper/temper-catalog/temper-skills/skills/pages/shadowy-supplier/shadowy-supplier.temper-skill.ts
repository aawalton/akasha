import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shadowySupplier = {
  id: "019e6238-c30b-7ee5-bcc2-04e2a734f06b",
  pageTypeSlug: "temper-skill",
  slug: "shadowy-supplier",
  title: "Shadowy Supplier",
  key: "shadowy-supplier",
  baseName: "Shadowy Supplier",
  description:
    '"A contact from the Brotherhood provides beneficial items once per day. This contact is located in Outlaw Refuges, the Gold Coast Dark Brotherhood Sanctuary, and the Hew\'s Bane Thieves Den."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_003.dds",
  esoSkillId: 77396,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-dark-brotherhood",
  skillType: "passive",
  subcategoryId: "guild-dark-brotherhood",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
