import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const cadwellCatalogCapture = {
  id: "01a060e2-3182-756a-bf21-3babbef6d0b0",
  pageTypeSlug: "module",
  slug: "cadwell-catalog-capture",
  definition:
    "the Cadwell's Almanac zones and points of interest, read into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "The three progression levels are read in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A zone or a point of interest carrying no name is left out.",
    },
  ],
} as const satisfies Module
