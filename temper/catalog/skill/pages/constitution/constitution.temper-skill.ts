import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const constitution = {
  id: "019e6238-c2ad-7ba1-8359-5a75a15d6450",
  type: "page-type/temper-skill",
  slug: "constitution",
  title: "Constitution",
  key: "constitution",
  baseName: "Constitution",
  description:
    "Increases your Health Recovery by 4% for each piece of Heavy Armor equipped. \n\nCurrent bonus: 0%.\n\nYou restore 108 Magicka and Stamina when you take damage for each piece of Heavy Armor equipped. This effect can occur once every 4 seconds. \n\nCurrent bonus: 0.",
  icon: "/esoui/art/icons/ability_armor_014.dds",
  esoSkillId: 45526,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/armor-heavy-armor",
  skillType: "temper-skill-type/passive",
  status: "partially-supported",
  effects: "jsonl",
  hashPlace: 242,
  createdAt: "2026-05-26T02:59:07.565Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 4% (Constant)",
    "<<2>> = 4 HeavyArmor (Heavy Armor, SingleTarget, Direct, R2 = 1)",
    "<<3>> = 108 (Constant)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = 108 HeavyArmor (Heavy Armor, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
