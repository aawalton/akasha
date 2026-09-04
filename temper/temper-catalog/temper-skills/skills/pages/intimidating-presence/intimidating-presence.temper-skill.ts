import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const intimidatingPresence = {
  id: "019e6238-c2cf-7245-b76f-3c3913f4ddc7",
  pageTypeSlug: "temper-skill",
  slug: "intimidating-presence",
  title: "Intimidating Presence",
  key: "intimidating-presence",
  baseName: "Intimidating Presence",
  description:
    '"Allows you to Intimidate NPCs in conversation.\\n\\nReduces the Stamina cost of your Fighters Guild abilities by 15%."',
  icon: "/esoui/art/icons/ability_fightersguild_passive_intimidate.dds",
  esoSkillId: 29062,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "passive",
  subcategoryId: "guild-fighters-guild",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
