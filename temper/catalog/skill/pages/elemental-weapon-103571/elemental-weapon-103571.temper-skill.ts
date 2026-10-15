import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const elementalWeapon103571 = {
  id: "019e6f53-a12e-784e-9a6f-c872e7b03e6b",
  type: "page-type/temper-skill",
  slug: "elemental-weapon-103571",
  title: "Elemental Weapon",
  key: "elemental-weapon-103571",
  baseName: "Imbue Weapon",
  description:
    "Infuse your weapon with power, causing your next Light Attack used within |cffffff2|r seconds to deal an additional |cffffff7509|r Magic Damage and apply the Burning, Concussion, or Chill elemental status effect.\n\nIf the power is not consumed in time, you restore |cffffff1668|r Magicka.",
  icon: "/esoui/art/icons/ability_psijic_003_a.dds",
  esoSkillId: 103571,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 3,
  morphIndex: 1,
  rank: 3,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
  hashPlace: 415,
  createdAt: "2026-05-28T16:03:32.270Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 6 seconds (Constant)",
    "<<2>> = 0.0929455 MaxStat + 0.976197 MaxPower - 0.668374 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 6 seconds (Constant)",
  ],
} as const satisfies TemperSkill
