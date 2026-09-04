import type { Module } from "@akasha/code-system/module"

export const zoneNamesDe01 = {
  id: "01a061e7-9306-7587-b4d0-0d0f7f9ff42a",
  pageTypeSlug: "module",
  slug: "zone-names-de-01",
  definition: "part 01 of every zone's name in de",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
