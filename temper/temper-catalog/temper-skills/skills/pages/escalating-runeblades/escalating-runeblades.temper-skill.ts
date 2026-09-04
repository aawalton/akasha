import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const escalatingRuneblades = {
  id: "019e6245-a672-7aa4-8819-5da7bc3c818e",
  pageTypeSlug: "temper-skill",
  slug: "escalating-runeblades",
  title: "Escalating Runeblades",
  key: "escalating-runeblades",
  baseName: "Runeblades",
  description:
    '"Craft a series of Apocryphal runes before launching them at a foe, dealing 696 Magic Damage, 766 Magic Damage, and 917 Magic Damage and generating Crux. The last rune explodes, dealing damage to all enemies within 8 meters of the target.\\n\\nThis ability deals 3% increased damage for each active Crux when cast."',
  icon: "/esoui/art/icons/ability_arcanist_001_b.dds",
  esoSkillId: 40182977,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
