import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const windWalker = {
  id: "019e6238-c32e-7b85-88bd-15ec37e502ae",
  type: "page-type/temper-skill",
  slug: "wind-walker",
  title: "Wind Walker",
  key: "wind-walker",
  baseName: "Wind Walker",
  description:
    "Increases your Stamina Recovery by 4% per piece of Medium Armor equipped. \n\nCurrent bonus: 0%.\n\nReduces the Stamina cost of your abilities by 2% per piece of Medium Armor equipped. \n\nCurrent bonus: 0%.",
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 45565,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "supported",
  effects: "jsonl",
  hashPlace: 1621,
  createdAt: "2026-05-26T02:59:07.694Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4% (Constant)",
    "<<2>> = 4 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 2% (Constant)",
    "<<4>> = 2 MediumArmor (Medium Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
