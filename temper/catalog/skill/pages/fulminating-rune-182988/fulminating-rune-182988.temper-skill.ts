import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fulminatingRune182988 = {
  id: "019e6f53-a262-73a2-aa7e-9e391b8c0107",
  type: "page-type/temper-skill",
  slug: "fulminating-rune-182988",
  title: "Fulminating Rune",
  key: "fulminating-rune-182988",
  baseName: "The Imperfect Ring",
  description:
    "Summon an explosive rune under an enemy that etches foes nearby with scrawled glyphs, dealing |cffffff15235|r Magic Damage over |cffffff20|r seconds.\n\nThe rune lingers on the initial target for |cffffff6|r seconds before detonating, dealing |cffffff5288|r Frost Damage to enemies within 7 meters. Rune detonation cannot be primed with Fulminating Rune again for |cffffff6|r seconds.\n\nUp to 3 allies near the initial target can activate the Runebreak synergy, dealing |cffffff9914|r Frost Damage to enemies within 7 meters.",
  icon: "/esoui/art/icons/ability_arcanist_004_b.dds",
  esoSkillId: 182988,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 42,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 552,
  createdAt: "2026-05-28T16:03:32.578Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 0.0620437 MaxStat + 0.650882 MaxPower - 2.37419 (Ultimate, ratio = 10.49, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
    "<<5>> = Fulminating Rune (Constant)",
    "<<6>> = 6 seconds (Constant)",
    "<<7>> = Runebreak (Constant)",
    "<<8>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
