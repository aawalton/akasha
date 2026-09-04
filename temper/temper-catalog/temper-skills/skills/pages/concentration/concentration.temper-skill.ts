import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const concentration = {
  id: "019e6238-c2ab-7300-a822-caf917244679",
  pageTypeSlug: "temper-skill",
  slug: "concentration",
  title: "Concentration",
  key: "concentration",
  baseName: "Concentration",
  description:
    '"Increases your Physical and Spell Penetration by 939 for each piece of Light Armor worn.\\n\\nCurrent bonus: 0"',
  icon: "/esoui/art/icons/ability_sorcerer_060.dds",
  esoSkillId: 45562,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
