import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runicSunder = {
  id: "019e6245-a71f-72e5-8c96-b1a7ebd13b1c",
  pageTypeSlug: "temper-skill",
  slug: "runic-sunder",
  title: "Runic Sunder",
  key: "runic-sunder",
  baseName: "Runic Jolt",
  description:
    '"Craft a defensive Apocryphal rune that deals 1161 Physical Damage. The rune steals 2200 Armor and applies Minor Maim for 15 seconds, reducing their damage done by 5%.\\n\\nThe rune also taunts for 15 seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by 2% per active Crux."',
  icon: "/esoui/art/icons/ability_arcanist_007_a.dds",
  esoSkillId: 40183430,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
