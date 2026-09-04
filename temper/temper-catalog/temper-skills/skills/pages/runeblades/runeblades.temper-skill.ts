import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runeblades = {
  id: "019e6f53-a689-7eba-8c5f-e5f8246ea2b0",
  pageTypeSlug: "temper-skill",
  slug: "runeblades",
  title: "Runeblades",
  key: "runeblades",
  baseName: "Runeblades",
  description:
    '"Craft a series of Apocryphal runes before launching them at a foe, dealing |cffffff2423|r Magic Damage three times and generating Crux.\\n\\nThis ability deals |cffffff3|r% increased damage for each active Crux when cast."',
  icon: "/esoui/art/icons/ability_arcanist_001.dds",
  esoSkillId: 185794,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
