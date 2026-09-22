import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const padomaicSprint = {
  id: "019e6238-c2f4-73d7-a608-d2f032275217",
  type: "page-type/temper-skill",
  slug: "padomaic-sprint",
  title: "Padomaic Sprint",
  key: "padomaic-sprint",
  baseName: "Padomaic Sprint",
  description:
    '"Grants Major Expedition, increasing your Movement Speed by 30% for 12 seconds after killing an enemy with Blade of Woe."',
  icon: "/esoui/art/icons/ability_darkbrotherhood_passive_004.dds",
  esoSkillId: 79868,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/guild-dark-brotherhood",
  skillType: "temper-skill-type/passive",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
