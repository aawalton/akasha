import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const tokenHash = {
  id: "01a05fd3-4363-7c0f-9df5-69d317e01c6f",
  type: "text-property",
  slug: "token-hash",
  propertySlug: "token-hash",
  definition: "the digest a token is recognised by without the token being held",
  maxLength: 64,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
