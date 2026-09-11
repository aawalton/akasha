import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const accountPage = {
  id: "01a05fba-ce37-7ab7-ac79-b568699606b3",
  type: "text-property",
  slug: "account-page",
  propertySlug: "account-page",
  definition: "the account a page belongs to",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  an account." }],
  types: "ts",
} as const satisfies TextProperty
