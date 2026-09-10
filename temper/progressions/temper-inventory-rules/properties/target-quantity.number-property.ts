import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type TargetQuantity = number

export const targetQuantity = {
  id: "01a07283-f295-7205-a4ef-8820858e243a",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "target-quantity",
  propertySlug: "target-quantity",
  definition: "how many of an item one leg of a destination chain takes",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leg stating no quantity takes every item reaching that leg.",
    },
  ],
} as const satisfies NumberProperty
