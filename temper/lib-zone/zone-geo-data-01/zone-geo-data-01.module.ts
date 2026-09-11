import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const zoneGeoData01 = {
  id: "01a061e7-92f9-7527-bde0-4ff03ef27b8e",
  pageTypeSlug: "module",
  type: "module",
  slug: "zone-geo-data-01",
  definition: "part 01 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
