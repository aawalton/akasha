import type { Module } from "@akasha/code-system/module"

export const zoneGeoData00 = {
  id: "01a061e7-92f8-798e-bba4-986bf682dc1e",
  pageTypeSlug: "module",
  slug: "zone-geo-data-00",
  definition: "part 00 of which point of interest reaches a zone from its geographical parent",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
