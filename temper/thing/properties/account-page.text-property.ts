import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const accountPage = {
  id: "01a05fba-ce37-7ab7-ac79-b568699606b3",
  type: "page-type/text-property",
  slug: "account-page",
  propertySlug: "account-page",
  definition: "the account a page belongs to",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to an account.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An account's page is named `account-` joined to its id, which this value leaves off.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two of the three accounts named here have no page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
