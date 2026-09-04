import type { Module } from "@akasha/code-system/module"

export const zoneNamesEs01 = {
  id: "01a061e7-930f-7932-8ddd-4cfbb1f1ed09",
  pageTypeSlug: "module",
  slug: "zone-names-es-01",
  definition: "part 01 of every zone's name in es",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
