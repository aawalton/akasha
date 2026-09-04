import type { Module } from "@akasha/code-system/module"

export const mapPinsLib = {
  id: "01a06062-57e0-7fda-88f1-71a061e4e2a1",
  pageTypeSlug: "module",
  slug: "map-pins-lib",
  definition: "the library object every caller of the map pin library reaches",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A map change re-reads every filter's saved state.",
    },
    {
      invariantKind: "departure",
      statement: "A map change to the global filter group leaves the filters alone.",
    },
  ],
} as const satisfies Module
