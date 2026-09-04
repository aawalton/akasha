import type { TextProperty } from "@akasha/pages-system/text-property"

export type TokenHash = string

export const tokenHash = {
  id: "01a05fd3-4363-7c0f-9df5-69d317e01c6f",
  pageTypeSlug: "text-property",
  slug: "token-hash",
  propertySlug: "token-hash",
  definition: "the digest a token is recognised by without the token being held",
  max: 64,
  nameFormatSlug: null,
} as const satisfies TextProperty
