import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NetPayout = number

export const netPayout = {
  id: "01a0685d-89aa-7dab-b4d1-44a1c21309c3",
  pageTypeSlug: "number-property",
  slug: "net-payout",
  propertySlug: "net-payout",
  definition: "what a seller was left with in gold",
  max: null,
  invariants: [{ invariantKind: "departure", statement: "A payout is the price less the tax." }],
} as const satisfies NumberProperty
