import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const veilsForfeit = {
  id: "01a15ea7-5fee-79d8-8224-2fa51b949127",
  type: "page-type/temper-class-mastery",
  slug: "veils-forfeit",
  title: "Veil's Forfeit",
  key: "veils-forfeit",
  description:
    "Call souls back from an early grave. Only you may grant them release.\n\nWhile you are in combat, directly healing a target below 66% Health relinquishes them from death's clutches and allows you to use a corpse consuming ability against them within 10 seconds, up to once every second. \n\nExtends the duration of Major Vulnerability you apply by 50%.",
  esoSkillId: 263554,
  class: "temper-class/necromancer",
  hashPlace: 14,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
