import type { Module } from "@akasha/code-system/module"

export const zoneNamesJp03 = {
  id: "01a061e7-931a-7687-9e95-2b150c9b94d7",
  pageTypeSlug: "module",
  slug: "zone-names-jp-03",
  definition: "part 03 of every zone's name in jp",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
