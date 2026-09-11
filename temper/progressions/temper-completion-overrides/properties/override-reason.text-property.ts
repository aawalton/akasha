import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const overrideReason = {
  id: "01a05fd0-3aa7-73f0-9c3b-150ba0630621",
  type: "text-property",
  slug: "override-reason",
  propertySlug: "override-reason",
  definition: "why a count is set by hand instead of taken from the game",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
