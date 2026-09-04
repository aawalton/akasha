import type { Module } from "@akasha/code-system/module"

export const zoneNamesDe03 = {
  id: "01a061e7-9308-7d1d-8ad0-d96b467f829e",
  pageTypeSlug: "module",
  slug: "zone-names-de-03",
  definition: "part 03 of every zone's name in de",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
