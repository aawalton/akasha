import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const accountPage = {
  id: "01a05fba-ce37-7ab7-ac79-b568699606b3",
  type: "page-type/relation-property",
  slug: "account-page",
  propertySlug: "account-page",
  definition: "the account a page belongs to",
  targetPageType: "page-type/temper-account",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The signed-in user's id is the account page's key rather than this value.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:27:53.143Z",
  updatedAt: "2026-09-24T16:26:32.000Z",
} as const satisfies RelationProperty
