import type { TextProperty } from "@akasha/pages/text-property"

export type TokenHash = string

export const tokenHash = {
  id: "01a05fd3-4363-7c0f-9df5-69d317e01c6f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "token-hash",
  propertySlug: "token-hash",
  definition: "the digest a token is recognised by without the token being held",
  maxLength: 64,
  nameFormat: null,
} as const satisfies TextProperty
