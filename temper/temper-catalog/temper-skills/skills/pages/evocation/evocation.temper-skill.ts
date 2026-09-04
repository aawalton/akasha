import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const evocation = {
  id: "019e6238-c2bc-7a9d-8edd-900ef696b9ce",
  pageTypeSlug: "temper-skill",
  slug: "evocation",
  title: "Evocation",
  key: "evocation",
  baseName: "Evocation",
  description:
    '"Increases your Magicka Recovery by 4% for each piece of Light Armor equipped. \\n\\nCurrent bonus: 0%.\\n\\nReduces the Magicka cost of your abilities by 2% for each piece of Light Armor equipped.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_005.dds",
  esoSkillId: 45557,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
