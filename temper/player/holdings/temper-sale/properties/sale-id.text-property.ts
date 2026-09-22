import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const saleId = {
  id: "01a0685d-89aa-73f0-9b15-bfabe8437be8",
  type: "page-type/text-property",
  slug: "sale-id",
  propertySlug: "sale-id",
  definition: "what the game calls a sale",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale carrying no sale id is not kept.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
