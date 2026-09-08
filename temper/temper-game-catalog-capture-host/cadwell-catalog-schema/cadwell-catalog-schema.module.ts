import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const cadwellCatalogSchema = {
  id: "01a06076-5ea8-75f8-9c02-0071e3b7330b",
  pageTypeSlug: "module",
  slug: "cadwell-catalog-schema",
  definition: "the zod schema reading the Cadwell completion catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level has zones that have points of interest.",
    },
    {
      invariantKind: "departure",
      statement: "A zone has an order number.",
    },
    {
      invariantKind: "departure",
      statement: "A point of interest has an order number.",
    },
  ],
} as const satisfies Module
