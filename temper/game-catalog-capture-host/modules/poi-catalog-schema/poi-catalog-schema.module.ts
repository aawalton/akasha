import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poiCatalogSchema = {
  id: "01a06084-d419-7e65-9fe0-2100e873d96e",
  type: "module",
  slug: "poi-catalog-schema",
  definition: "the zod schema reading the points of interest catalog out of saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A zone has the points of interest found in that zone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A zone key and a point of interest key are both numbers.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A property outside the named set is refused.",
    },
  ],
} as const satisfies Module
