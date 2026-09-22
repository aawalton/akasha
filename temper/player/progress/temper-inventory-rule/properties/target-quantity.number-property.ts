import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const targetQuantity = {
  id: "01a07283-f295-7205-a4ef-8820858e243a",
  type: "page-type/number-property",
  slug: "target-quantity",
  propertySlug: "target-quantity",
  definition: "how many of an item a leg of a destination chain takes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg stating no quantity takes every item reaching that leg.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
