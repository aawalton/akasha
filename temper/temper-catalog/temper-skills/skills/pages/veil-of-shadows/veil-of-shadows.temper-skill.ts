import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const veilOfShadows = {
  id: "019e6238-c32c-7e5e-9cfd-dae64e11ca88",
  pageTypeSlug: "temper-skill",
  slug: "veil-of-shadows",
  title: "Veil of Shadows",
  key: "veil-of-shadows",
  baseName: "Veil of Shadows",
  description:
    '"Decreases detection range of Witnesses and Guards by 10%. Witnesses and Guards are thus less likely to notice criminal actions, though this has no impact on the range from which Guards will accost you."',
  icon: "/esoui/art/icons/ability_thievesguild_passive_003.dds",
  esoSkillId: 76453,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 10,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-thieves-guild",
  skillType: "passive",
  subcategoryId: "guild-thieves-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
