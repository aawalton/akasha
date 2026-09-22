import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkCloak = {
  id: "019e6245-a637-771b-8676-6e362267e9ca",
  type: "page-type/temper-skill",
  slug: "dark-cloak",
  title: "Dark Cloak",
  key: "dark-cloak",
  baseName: "Shadow Cloak",
  description:
    '"Shroud yourself in protective shadow to heal for 853 Health every 1 second, over 3 seconds, increasing by an additional 150% while Bracing. This portion of the ability scales off your Max Health.\\n\\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by 5%."',
  icon: "/esoui/art/icons/ability_nightblade_004_b.dds",
  esoSkillId: 36351,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "temper-skill-type/active",
  subcategoryId: "nightblade-shadow",
  effects: "jsonl",
} as const satisfies TemperSkill
