import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const skilledTracker = {
  id: "019e6238-c310-7721-bea9-602d3571a071",
  type: "page-type/temper-skill",
  slug: "skilled-tracker",
  title: "Skilled Tracker",
  key: "skilled-tracker",
  baseName: "Skilled Tracker",
  description:
    '"Your Fighters Guild abilities deal an additional 10% damage. This bonus doubles against player Vampires and Werewolves."',
  icon: "/esoui/art/icons/ability_armor_007.dds",
  esoSkillId: 40393,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 0,
  rank: 1,
  skillLineId: "guild-fighters-guild",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
