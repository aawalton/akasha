import type { Module } from "@akasha/code-system/module"

export const zoneNamesFr01 = {
  id: "01a061e7-9314-77c9-9f3f-d636d61d9fda",
  pageTypeSlug: "module",
  slug: "zone-names-fr-01",
  definition: "part 01 of every zone's name in fr",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
