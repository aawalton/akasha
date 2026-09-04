import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theImperfectRing = {
  id: "019e6f53-a82e-7530-bcd8-29aae940128d",
  pageTypeSlug: "temper-skill",
  slug: "the-imperfect-ring",
  title: "The Imperfect Ring",
  key: "the-imperfect-ring",
  baseName: "The Imperfect Ring",
  description:
    '"Summon a flawed rune under an enemy that etches foes nearby with scrawled glyphs, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds.\\n\\nAn ally near the initial target can activate the Runebreak synergy, dealing |cffffff9914|r Frost Damage to enemies within 7 meters."',
  icon: "/esoui/art/icons/ability_arcanist_004.dds",
  esoSkillId: 185836,
  isMorph: false,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
