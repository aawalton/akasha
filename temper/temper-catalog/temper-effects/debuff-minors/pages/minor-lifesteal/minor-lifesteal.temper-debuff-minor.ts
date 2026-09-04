import type { TemperDebuffMinor } from "../../temper-debuff-minor.page-type.ts"

export const minorLifesteal = {
  id: "01a05fc6-42c4-777f-a74f-98f58996b458",
  pageTypeSlug: "temper-debuff-minor",
  slug: "minor-lifesteal",
  title: "Minor Lifesteal",
  key: "minor-lifesteal",
  description: "Heals attackers for 600 Health when dealing damage",
} as const satisfies TemperDebuffMinor
