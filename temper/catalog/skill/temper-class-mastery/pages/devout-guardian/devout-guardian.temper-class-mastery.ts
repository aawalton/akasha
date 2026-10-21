import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const devoutGuardian = {
  id: "01a15ea7-5feb-7eee-8722-1c2801bb07c7",
  type: "page-type/temper-class-mastery",
  slug: "devout-guardian",
  title: "Devout Guardian",
  key: "devout-guardian",
  description:
    "Radiant is the shield that pushes back the dark.\n\nWhile Sacred Ground is active, you gain a damage shield for 6 seconds, up to once every 6 seconds. The shield absorbs up to 8080 damage and provides 300 Health, Magicka, and Stamina Recovery while active. If the shield breaks, you gain 10 Ultimate.",
  esoSkillId: 263586,
  class: "temper-class/templar",
  hashPlace: 26,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
