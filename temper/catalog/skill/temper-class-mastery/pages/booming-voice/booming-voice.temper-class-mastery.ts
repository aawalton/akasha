import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const boomingVoice = {
  id: "01a15ea7-5fea-7519-977e-7425dddffe96",
  type: "page-type/temper-class-mastery",
  slug: "booming-voice",
  title: "Booming Voice",
  key: "booming-voice",
  description:
    "Let your voice echo across the peaks.\n\nActivating rank 2 of The Storm Voice now also grants 5 Health, Magicka, and Stamina Recovery for every Ultimate spent for 10 seconds after a delay of 15 seconds.",
  esoSkillId: 240268,
  class: "temper-class/dragonknight",
  hashPlace: 6,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
