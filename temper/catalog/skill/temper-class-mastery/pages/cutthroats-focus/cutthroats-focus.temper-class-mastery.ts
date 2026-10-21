import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const cutthroatsFocus = {
  id: "01a15ea7-5feb-710f-a6c6-c5ccf5f72f2f",
  type: "page-type/temper-class-mastery",
  slug: "cutthroats-focus",
  title: "Cutthroat's Focus",
  key: "cutthroats-focus",
  description:
    "This duel will be their last. For you, it's just another dance.\n\nActivating a Nightblade ability while bracing causes you to dodge attacks for 0.3 seconds.\n\nWhenever you dodge an attack, your attacker's psyche suffers, increasing their damage taken by 5% for 5 seconds, increasing to 20 seconds against monsters.",
  esoSkillId: 263606,
  class: "temper-class/nightblade",
  hashPlace: 18,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
