import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const runeOfDisplacement = {
  id: "019e6245-a718-75fa-bcda-86dc582b1417",
  type: "page-type/temper-skill",
  slug: "rune-of-displacement",
  title: "Rune of Displacement",
  key: "rune-of-displacement",
  baseName: "The Imperfect Ring",
  description:
    "Summon a discharging rune under an enemy. After 2 seconds the rune pulses, pulling in foes between 2 to 10 meters and etching them with scrawled glyphs that deal 4780 Magic Damage over 18 seconds.\n\nAn ally near the initial target can activate the Runebreak synergy, dealing 2698 Frost Damage to enemies within 7 meters.",
  icon: "/esoui/art/icons/ability_arcanist_004_a.dds",
  esoSkillId: 40185839,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/arcanist-herald-of-the-tome",
  skillType: "temper-skill-type/active",
  hashPlace: 1096,
  createdAt: "2026-05-26T03:13:12.472Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 2 seconds (Constant)",
    "<<2>> = 0.0213572 MaxStat + 0.224424 MaxPower - 2.67771 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, DOT, 18s duration, 2s tick, R2 = 0.999994)",
    "<<3>> = 18 seconds (Constant)",
    "<<4>> = Runebreak (Constant)",
    "<<5>> = 0.12 MaxStat + 1.26 MaxPower (Ultimate, ratio = 10.50, Dmg, Frost, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
