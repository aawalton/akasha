import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const healCount = {
  id: "01a06193-6caa-71e6-b133-c151112a6fea",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "heal-count",
  propertySlug: "heal-count",
  definition: "how many heals one cast lands",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
