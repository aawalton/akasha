import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type MinedAt = string

export const minedAt = {
  id: "01a05fcd-f552-7078-af6f-196c906a2777",
  pageTypeSlug: "instant-property",
  slug: "mined-at",
  propertySlug: "mined-at",
  definition: "when a sweep read this row out of the game",
} as const satisfies InstantProperty
