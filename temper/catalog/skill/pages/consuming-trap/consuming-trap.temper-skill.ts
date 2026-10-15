import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const consumingTrap = {
  id: "019e6251-4ca1-72e3-961b-73495b9c3907",
  type: "page-type/temper-skill",
  slug: "consuming-trap",
  title: "Consuming Trap",
  key: "consuming-trap",
  baseName: "Soul Trap",
  description:
    "Lay claim to an enemy's soul, dealing 4642 Magic Damage over 20 seconds.\n\nIf an affected enemy dies, you fill an empty Soul Gem, heal for 3200 Health, and restore 2400 Magicka and 2400 Stamina. This portion of the ability scales off your Max Health, Magicka, and Stamina.",
  icon: "/esoui/art/icons/ability_otherclass_001_b.dds",
  esoSkillId: 43083,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/world-soul-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 244,
  createdAt: "2026-05-26T03:25:55.745Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.00779125 Magicka + 0.24511 SD + 62.2075 (Magicka, ratio = 31.46, Dmg, Magic, SingleTarget, DOT, 20s duration, 2s tick, R2 = 0.942425)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = -0.0239113 Magicka + 0.0687877 SD + 3627.85 (Magicka, ratio = -2.88, Heal, SingleTarget, Direct, R2 = 0.0076835)",
    "<<4>> = -0.0078336 Health + 2704.76 (Health, SingleTarget, Direct, R2 = 0.0027372)",
    "<<5>> = 0.2 Stamina (Stamina, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
