import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const improvedSneak = {
  id: "019e6238-c2ca-7db7-aa23-2048d0350b65",
  type: "page-type/temper-skill",
  slug: "improved-sneak",
  title: "Improved Sneak",
  key: "improved-sneak",
  baseName: "Improved Sneak",
  description:
    "Reduces the cost of Sneak by 7% for each piece of Medium Armor equipped. \n\nCurrent bonus: 0%.\n\nReduces the size of your detection area while Sneaking by 5% for each piece of Medium Armor equipped. \n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_007.dds",
  esoSkillId: 45567,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 675,
  createdAt: "2026-05-26T02:59:07.594Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 7 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 5 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
