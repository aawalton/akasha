import type { Module } from "@akasha/code-system/module"

export const zoneNamesPl00 = {
  id: "01a061e7-931c-77b6-a764-04914ed7efa5",
  pageTypeSlug: "module",
  slug: "zone-names-pl-00",
  definition: "part 00 of every zone's name in pl",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
