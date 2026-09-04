import type { TextProperty } from "@akasha/pages-system/text-property"

export type TokenName = string

export const tokenName = {
  id: "01a05fd3-4363-765b-9a4e-764100ade364",
  pageTypeSlug: "text-property",
  slug: "token-name",
  propertySlug: "token-name",
  definition: "the name a token is shown under where tokens are listed",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
