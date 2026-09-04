import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const agility = {
  id: "019e6238-c28d-7382-b246-b7cafaa2982c",
  pageTypeSlug: "temper-skill",
  slug: "agility",
  title: "Agility",
  key: "agility",
  baseName: "Agility",
  description:
    '"Increases your Weapon and Spell Damage by 2% for each piece of Medium Armor worn.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_010.dds",
  esoSkillId: 45572,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 38,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-medium-armor",
  skillType: "passive",
  subcategoryId: "armor-medium-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
