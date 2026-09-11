import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const lastCompletedAt = {
  id: "01a05fd3-435e-7260-87d6-7375b39dfe6d",
  type: "instant-property",
  slug: "last-completed-at",
  propertySlug: "last-completed-at",
  definition: "when a task was last marked done",
  types: "ts",
} as const satisfies InstantProperty
