import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceDarkExchange = {
  id: "019e6f53-a8e3-7d16-b0d8-8c06c27fd6f9",
  type: "page-type/temper-skill",
  slug: "vengeance-dark-exchange",
  title: "Vengeance Dark Exchange",
  key: "vengeance-dark-exchange",
  baseName: "Vengeance Dark Exchange",
  description:
    '"Bargain with darkness to restore |cffffff8160|r Health and |cffffff3600|r Magicka."',
  icon: "/esoui/art/icons/ability_sorcerer_dark_exchange.dds",
  esoSkillId: 237808,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
