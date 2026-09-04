import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HealCount = number

export const healCount = {
  id: "01a06193-6caa-71e6-b133-c151112a6fea",
  pageTypeSlug: "number-property",
  slug: "heal-count",
  propertySlug: "heal-count",
  definition: "how many heals one cast lands",
  max: null,
} as const satisfies NumberProperty
