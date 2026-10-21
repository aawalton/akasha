import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const staticReverberation = {
  id: "01a15ea7-5fed-7832-acf3-445761991caa",
  type: "page-type/temper-class-mastery",
  slug: "static-reverberation",
  title: "Static Reverberation",
  key: "static-reverberation",
  description:
    "The battlefield crackles with untapped potential. Make use of it.\n\nWhen you deal damage with a Sorcerer ability, you have a 20% chance to deal 1055 Shock Damage, up to once every 0.1 seconds. \n\nThe chance increases by 1% for every 1% missing Health the target has. The total chance is divided by 1 plus every permanent pet you have active.",
  esoSkillId: 263872,
  class: "temper-class/sorcerer",
  hashPlace: 22,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
