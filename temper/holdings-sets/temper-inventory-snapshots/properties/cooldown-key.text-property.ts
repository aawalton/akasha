import type { TextProperty } from "@akasha/pages/text-property"

export type CooldownKey = string

export const cooldownKey = {
  id: "01a0675a-f185-7261-8c87-615e5578b628",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "cooldown-key",
  propertySlug: "cooldown-key",
  definition: "the string the game names a timed activity by",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
