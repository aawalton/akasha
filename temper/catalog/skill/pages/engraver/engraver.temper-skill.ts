import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const engraver = {
  id: "019e6224-cc94-7a40-9a5e-dcad1f2978fc",
  type: "page-type/temper-skill",
  slug: "engraver",
  title: "Engraver",
  key: "engraver",
  baseName: "Engraver",
  description: '"Allows the use of Platinum Ounces."',
  icon: "/esoui/art/icons/passive_jewelerengraver.dds",
  esoSkillId: 103636,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 5,
  skillLineId: "temper-skill-line/craft-jewelry-crafting",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
