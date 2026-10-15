import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const mediumArmorBonuses = {
  id: "019e6238-c2e8-7837-b25e-6c992c67b226",
  type: "page-type/temper-skill",
  slug: "medium-armor-bonuses",
  title: "Medium Armor Bonuses",
  key: "medium-armor-bonuses",
  baseName: "Medium Armor Bonuses",
  description:
    "Each piece of Medium Armor does the following:\n\nReduces the cost of Sprint by 1%\n\nReduces the cost of Sneak by 5%\n\nReduces the cost of Block by 3%\n\nReduces damage taken from Area of Effect attacks by 2% for 2 seconds after you use Roll Dodge\n\nIncreases Movement Speed by 2% while immune to crowd control",
  icon: "/esoui/art/icons/passive_armor2_medium.dds",
  esoSkillId: 150181,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/armor-medium-armor",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 813,
  createdAt: "2026-05-26T02:59:07.624Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 1% (Constant)",
    "<<2>> = 5% (Constant)",
    "<<3>> = 3% (Constant)",
    "<<4>> = 2% (Constant)",
  ],
} as const satisfies TemperSkill
