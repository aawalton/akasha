import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EffectAmount = number

export const effectAmount = {
  id: "01a06193-6ca9-77b4-9ef7-a846d70c1675",
  pageTypeSlug: "number-property",
  slug: "effect-amount",
  propertySlug: "amount",
  definition: "how much of a resource an effect gives or takes",
  max: null,
} as const satisfies NumberProperty
