import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const netPayout = {
  id: "01a0685d-89aa-7dab-b4d1-44a1c21309c3",
  type: "page-type/number-property",
  slug: "net-payout",
  propertySlug: "net-payout",
  definition: "what a seller was left with in gold",
  max: null,
  decisions: [
    { decisionKind: "decision-kind/departure", statement: "A payout is the price less the tax." },
  ],
  types: "ts",
} as const satisfies NumberProperty
