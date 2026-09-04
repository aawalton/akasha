import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shuffle = {
  id: "019e6238-c30d-7c9e-b0b1-d6e43940efcc",
  pageTypeSlug: "temper-skill",
  slug: "shuffle",
  title: "Shuffle",
  key: "shuffle",
  baseName: "Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, decreasing damage taken from area attacks by 20% for 20 seconds.\\n\\nEach piece of Medium Armor worn removes and grants immunity to snares and immobilizations for 1 second."',
  icon: "/esoui/art/icons/ability_armor_002_a.dds",
  esoSkillId: 41131,
  isMorph: true,
  learnedLevel: 22,
  lineRankNeeded: 22,
  morphIndex: 1,
  rank: 8,
  skillLineId: "armor-medium-armor",
  skillType: "active",
  subcategoryId: "armor-medium-armor",
} as const satisfies TemperSkill
