import type { Module } from "@akasha/code-system/module"

export const zoneNamesFr03 = {
  id: "01a061e7-9316-7fc0-b363-bec494165697",
  pageTypeSlug: "module",
  slug: "zone-names-fr-03",
  definition: "part 03 of every zone's name in fr",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
