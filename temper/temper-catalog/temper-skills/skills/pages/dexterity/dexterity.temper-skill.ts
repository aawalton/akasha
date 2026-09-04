import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const dexterity = {
  id: "019e6238-c2b3-7c77-ab59-f2c0250d072b",
  pageTypeSlug: "temper-skill",
  slug: "dexterity",
  title: "Dexterity",
  key: "dexterity",
  baseName: "Dexterity",
  description:
    '"Increases your Critical Damage and Healing done rating by 2% for every piece of Medium Armor equipped.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_008.dds",
  esoSkillId: 45564,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 3,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
