import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const fulminatingRune = {
  id: "019e6245-a68d-7c0b-a3eb-8dcdbb55446f",
  type: "page-type/temper-skill",
  slug: "fulminating-rune",
  title: "Fulminating Rune",
  key: "fulminating-rune",
  baseName: "The Imperfect Ring",
  description:
    "Summon an explosive rune under an enemy that etches foes nearby with scrawled glyphs, dealing 4642 Magic Damage over 20 seconds.\n\nThe rune lingers on the initial target for 6 seconds before detonating, dealing 1438 Frost Damage to enemies within 7 meters. Rune detonation cannot be primed with Fulminating Rune again for 6 seconds.\n\nUp to 3 allies near the initial target can activate the Runebreak synergy, dealing 2698 Frost Damage to enemies within 7 meters.",
  icon: "/esoui/art/icons/ability_arcanist_004_b.dds",
  esoSkillId: 40182988,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 551,
  createdAt: "2026-05-26T03:13:12.333Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.0187221 MaxStat + 0.197106 MaxPower + 0.0870345 (Ultimate, ratio = 10.53, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.999998)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = 6 seconds (Constant)",
    "<<4>> = 0.0640613 MaxStat + 0.672578 MaxPower - 3.1811 (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 0.999999)",
    "<<5>> = Fulminating Rune (Constant)",
    "<<6>> = 6 seconds (Constant)",
    "<<7>> = Runebreak (Constant)",
    "<<8>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
