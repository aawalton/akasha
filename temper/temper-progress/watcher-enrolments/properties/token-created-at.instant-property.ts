import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type TokenCreatedAt = string

export const tokenCreatedAt = {
  id: "01a05fd3-4362-7846-9ed1-b949bc7e6786",
  pageTypeSlug: "instant-property",
  slug: "token-created-at",
  propertySlug: "token-created-at",
  definition: "when a token was issued",
} as const satisfies InstantProperty
