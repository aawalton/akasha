import type { InstantProperty } from "@akasha/pages/instant-property"

export type LastCompletedAt = string

export const lastCompletedAt = {
  id: "01a05fd3-435e-7260-87d6-7375b39dfe6d",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "last-completed-at",
  propertySlug: "last-completed-at",
  definition: "when a task was last marked done",
} as const satisfies InstantProperty
