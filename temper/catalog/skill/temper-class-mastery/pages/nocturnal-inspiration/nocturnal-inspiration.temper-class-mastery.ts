import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const nocturnalInspiration = {
  id: "01a15ea7-5fed-771c-b710-15a914954bcf",
  type: "page-type/temper-class-mastery",
  slug: "nocturnal-inspiration",
  title: "Nocturnal Inspiration",
  key: "nocturnal-inspiration",
  description:
    "The Night Mistress rewards those who strike without reservation.\n\nUpgrades rank 2 of Hemorrhage to have a chance to generate 2 Ultimate while in combat. This effect can occur once every 0.3 seconds and the chance is equal to your Weapon Critical chance.",
  esoSkillId: 263603,
  class: "temper-class/nightblade",
  hashPlace: 15,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
