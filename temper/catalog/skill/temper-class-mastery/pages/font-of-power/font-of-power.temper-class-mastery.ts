import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const fontOfPower = {
  id: "01a15ea7-5fec-7286-b4c4-b700f8ce5610",
  type: "page-type/temper-class-mastery",
  slug: "font-of-power",
  title: "Font of Power",
  key: "font-of-power",
  description:
    "Within you is a wellspring of near unlimited power.\n\nUpgrades rank 2 of Exploitation to work with any Sorcerer ability and increases your Weapon and Spell Damage by 9% for 10 seconds. The Weapon and Spell Damage increases by 1% for every 1750 Max Magicka or Stamina you have, whichever is higher.",
  esoSkillId: 263871,
  class: "temper-class/sorcerer",
  hashPlace: 21,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
