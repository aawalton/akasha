import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const engraver = {
  id: "019e6224-cc94-7a40-9a5e-dcad1f2978fc",
  pageTypeSlug: "temper-skill",
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
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
