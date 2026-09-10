import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TokenName = string

export const tokenName = {
  id: "01a05fd3-4363-765b-9a4e-764100ade364",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "token-name",
  propertySlug: "token-name",
  definition: "the name a token is shown under where tokens are listed",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
