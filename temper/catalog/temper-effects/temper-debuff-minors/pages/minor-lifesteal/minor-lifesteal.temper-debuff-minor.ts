import type { TemperDebuffMinor } from "akasha/temper/catalog/temper-effects/temper-debuff-minors/temper-debuff-minor.page-type.types.ts"

export const minorLifesteal = {
  id: "01a05fc6-42c4-777f-a74f-98f58996b458",
  type: "temper-debuff-minor",
  slug: "minor-lifesteal",
  title: "Minor Lifesteal",
  key: "minor-lifesteal",
  description: "Heals attackers for 600 Health when dealing damage",
} as const satisfies TemperDebuffMinor
