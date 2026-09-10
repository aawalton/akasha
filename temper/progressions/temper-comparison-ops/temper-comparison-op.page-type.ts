import type { PageType } from "@akasha/pages/page-type"
import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"

export type TemperComparisonOp = TemperProgressThing

export const temperComparisonOp = {
  id: "01a05fc9-9a02-7bf9-8334-b9a9baaf4ee4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-comparison-op",
  definition: "a way of comparing a number an item rule reads",
  pluralSlug: "temper-comparison-ops",
  extends: ["page-type/temper-progress-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key is the operator an item rule writes.",
    },
    {
      invariantKind: "departure",
      statement: "The title is the operator a reader is shown.",
    },
  ],
} as const satisfies PageType
