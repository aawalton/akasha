import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperAntiquityCategory = {
  id: "01a06166-503c-7000-a696-166a5a6ce1df",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-antiquity-category",
  definition: "a grouping the game files antiquity lore under",
  pluralSlug: "temper-antiquity-categories",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/eso-antiquity-category-id",
    "number-property/eso-antiquity-id",
    "number-property/eso-antiquity-set-id",
    "number-property/total-lore-entries",
    "page-property-entry/antiquities",
    "text-property/antiquity-name",
  ],
  properties: [
    { pageProperty: "number-property/eso-antiquity-category-id", required: true, many: false },
    { pageProperty: "page-property-entry/antiquities", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category is numbered in a key space of its own rather than by zone.",
    },
  ],
  types: "ts",
} as const satisfies PageType
