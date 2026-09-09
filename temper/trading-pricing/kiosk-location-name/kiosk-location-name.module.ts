import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const kioskLocationName = {
  id: "01a0609b-e59e-7045-b6df-6ee2d2b62d25",
  pageTypeSlug: "module",
  slug: "kiosk-location-name",
  definition: "the zone and the city each guild kiosk id names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the guild trader pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A kiosk id no guild trader page claims answers with its own number.",
    },
  ],
} as const satisfies Module
