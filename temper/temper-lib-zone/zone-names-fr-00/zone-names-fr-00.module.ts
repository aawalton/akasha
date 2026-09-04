import type { Module } from "@akasha/code-system/module"

export const zoneNamesFr00 = {
  id: "01a061e7-9313-78fe-b162-ab8691c160a9",
  pageTypeSlug: "module",
  slug: "zone-names-fr-00",
  definition: "part 00 of every zone's name in fr",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
