import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type AbilityCooldown = number

export const abilityCooldown = {
  id: "01a05fcd-f54b-793a-81d3-a56e18375ccf",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "ability-cooldown",
  propertySlug: "ability-cooldown",
  definition: "how many seconds an item's ability waits between uses",
  max: null,
} as const satisfies NumberProperty
