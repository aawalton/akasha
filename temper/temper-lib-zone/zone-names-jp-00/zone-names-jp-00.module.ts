import type { Module } from "@akasha/code-system/module"

export const zoneNamesJp00 = {
  id: "01a061e7-9317-7ca1-949a-b0e5646534ae",
  pageTypeSlug: "module",
  slug: "zone-names-jp-00",
  definition: "part 00 of every zone's name in jp",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
