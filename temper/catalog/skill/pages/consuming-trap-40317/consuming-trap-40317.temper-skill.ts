import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const consumingTrap40317 = {
  id: "019e6f53-a01c-7463-95c1-51c8821c41e9",
  type: "page-type/temper-skill",
  slug: "consuming-trap-40317",
  title: "Consuming Trap",
  key: "consuming-trap-40317",
  baseName: "Soul Trap",
  description:
    "Lay claim to an enemy's soul, dealing |cffffff15235|r Magic Damage over |cffffff20|r seconds.\n\nIf an affected enemy dies, you fill an empty Soul Gem, heal for |cffffff4022|r Health, and restore |cffffff2832|r Magicka and |cffffff5527|r Stamina. This portion of the ability scales off your Max Health, Magicka, and Stamina.",
  icon: "/esoui/art/icons/ability_otherclass_001_b.dds",
  esoSkillId: 40317,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 245,
  createdAt: "2026-05-28T16:03:31.996Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.00779125 Magicka + 0.24511 SD + 62.2075 (Magicka, ratio = 31.46, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.942425)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = -0.0203571 Magicka + 0.0585711 SD + 3083.75 (Magicka, ratio = -2.88, Heal, SingleTarget, Direct, R2 = 0.0077047)",
    "<<4>> = -0.0066858 Health + 2299.64 (Health, SingleTarget, Direct, R2 = 0.0027613)",
    "<<5>> = 0.17 Stamina (Stamina, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
