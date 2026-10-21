import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const sphereOfInfluence = {
  id: "01a15ea7-5fed-7a5b-bc58-033301cfe172",
  type: "page-type/temper-class-mastery",
  slug: "sphere-of-influence",
  title: "Sphere of Influence",
  key: "sphere-of-influence",
  description:
    "Magicka extends your reach, a benefit to those who fight beside you.\n\nCasting a damage shield on yourself or an ally grants an additional shield that absorbs up to 6060 damage for 4 seconds and 225 Health, Magicka, and Stamina Recovery for 12 seconds. The shield scales off the higher of your Max Health or Max Magicka, and is capped at 25% of the target's Max Health.",
  esoSkillId: 263874,
  class: "temper-class/sorcerer",
  hashPlace: 24,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
