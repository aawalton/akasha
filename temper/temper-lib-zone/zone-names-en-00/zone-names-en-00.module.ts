import type { Module } from "@akasha/code-system/module"

export const zoneNamesEn00 = {
  id: "01a061e7-930a-7ecd-9de2-583e0cd3780b",
  pageTypeSlug: "module",
  slug: "zone-names-en-00",
  definition: "part 00 of every zone's name in en",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
