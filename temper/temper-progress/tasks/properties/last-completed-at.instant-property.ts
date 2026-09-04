import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type LastCompletedAt = string

export const lastCompletedAt = {
  id: "01a05fd3-435e-7260-87d6-7375b39dfe6d",
  pageTypeSlug: "instant-property",
  slug: "last-completed-at",
  propertySlug: "last-completed-at",
  definition: "when a recurring task was last marked done",
} as const satisfies InstantProperty
