import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const lightArmorPenalties = {
  id: "019e6238-c2e1-7ff1-9716-563fd61ff198",
  pageTypeSlug: "temper-skill",
  slug: "light-armor-penalties",
  title: "Light Armor Penalties",
  key: "light-armor-penalties",
  baseName: "Light Armor Penalties",
  description:
    '"Each piece of Light Armor does the following:\\n\\nIncreases damage taken from Martial attacks by 1%\\n\\nIncreases the cost of Block by 3%\\n\\nDecreases damage done with Bash by 1%"',
  icon: "/esoui/art/icons/passive_armor2_light.dds",
  esoSkillId: 152778,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "partially-supported",
  effects: "jsonl",
} as const satisfies TemperSkill
