import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const transfer36587 = {
  id: "019e6f53-a85a-7a7b-932d-43c1bd951048",
  type: "page-type/temper-skill",
  slug: "transfer-36587",
  title: "Transfer",
  key: "transfer-36587",
  baseName: "Transfer",
  description:
    '"Casting a Siphoning ability while in combat generates |cffffff1|r Ultimate. This effect can occur once every |cffffff4|r seconds."',
  icon: "/esoui/art/icons/passive_sorcerer_002.dds",
  esoSkillId: 36587,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "nightblade-siphoning",
  skillType: "temper-skill-type/passive",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
