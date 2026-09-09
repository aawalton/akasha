import type { PageType } from "@akasha/pages/page-type"
import type { CapturedAt } from "../../catalogs/temper-world/properties/captured-at.instant-property.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.ts"
import type { TotalValue } from "./properties/total-value.number-property.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}

export const temperHoldingsThing = {
  id: "01a05fcb-fd2b-77f2-923a-cb5f59585696",
  pageTypeSlug: "page-type",
  slug: "temper-holdings-thing",
  definition: "a reading of what an account holds",
  pluralSlug: "temper-holdings-things",
  extends: ["page-type/temper-thing"],
  parts: ["number-property/total-value"],
  properties: [
    { pageProperty: "instant-property/captured-at", required: false, many: false },
    { pageProperty: "number-property/total-value", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading states an account's worth at one moment.",
    },
  ],
} as const satisfies PageType
