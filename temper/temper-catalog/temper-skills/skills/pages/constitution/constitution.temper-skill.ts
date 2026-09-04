import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const constitution = {
  id: "019e6238-c2ad-7ba1-8359-5a75a15d6450",
  pageTypeSlug: "temper-skill",
  slug: "constitution",
  title: "Constitution",
  key: "constitution",
  baseName: "Constitution",
  description:
    '"Increases your Health Recovery by 4% for each piece of Heavy Armor equipped. \\n\\nCurrent bonus: 0%.\\n\\nYou restore 108 Magicka and Stamina when you take damage for each piece of Heavy Armor equipped. This effect can occur once every 4 seconds. \\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/ability_armor_014.dds",
  esoSkillId: 45526,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
