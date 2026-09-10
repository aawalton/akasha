import type { PageType } from "@akasha/pages/page-type"

export const temperResearchLine = {
  id: "01a0616b-2cdf-7005-a903-e1d072da4881",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-research-line",
  definition: "one shape of item a player researches traits on",
  pluralSlug: "temper-research-lines",
  extends: ["page-type/temper-pursuit-thing"],
  parts: ["number-property/trait-index", "page-property-entry/traits", "text-property/trait-name"],
  properties: [
    { pageProperty: "text-property/parent", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/traits", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A research line hangs beneath the craft type the line is researched under.",
    },
  ],
  types: "ts",
} as const satisfies PageType
