import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const tokenLastUsedAt = {
  id: "01a05fd3-4363-7e26-a26a-864410b87ea0",
  type: "page-type/instant-property",
  slug: "token-last-used-at",
  propertySlug: "token-last-used-at",
  definition: "when a token was last accepted on a call",
  types: "ts",
} as const satisfies InstantProperty
