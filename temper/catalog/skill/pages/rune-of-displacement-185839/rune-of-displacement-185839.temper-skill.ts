import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeOfDisplacement185839 = {
  id: "019e6f53-a67e-76c5-8811-72e28540b80a",
  type: "page-type/temper-skill",
  slug: "rune-of-displacement-185839",
  title: "Rune of Displacement",
  key: "rune-of-displacement-185839",
  baseName: "The Imperfect Ring",
  description:
    "Summon a discharging rune under an enemy. After |cffffff2|r seconds the rune pulses, pulling in foes between 2 to 10 meters and etching them with scrawled glyphs that deal |cffffff15730|r Magic Damage over |cffffff18|r seconds.\n\nAn ally near the initial target can activate the Runebreak synergy, dealing |cffffff9914|r Frost Damage to enemies within 7 meters.",
  icon: "/esoui/art/icons/ability_arcanist_004_a.dds",
  esoSkillId: 185839,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1097,
  createdAt: "2026-05-28T16:03:33.630Z",
  updatedAt: "2026-10-21T03:53:31.433Z",
  equations: [
    "<<1>> = 2 seconds (Constant)",
    "<<2>> = 0.0206542 MaxStat + 0.217302 MaxPower - 1.95364 (Ultimate, ratio = 10.52, Dmg, Magic, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999996)",
    "<<3>> = 18 seconds (Constant)",
    "<<4>> = Runebreak (Constant)",
    "<<5>> = 0.11999797 MaxStat + 1.2599787 MaxPower (Ultimate, Dmg, Frost, AOE, Direct, Melee)",
  ],
} as const satisfies TemperSkill
