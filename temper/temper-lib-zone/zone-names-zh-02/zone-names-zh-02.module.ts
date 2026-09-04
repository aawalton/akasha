import type { Module } from "@akasha/code-system/module"

export const zoneNamesZh02 = {
  id: "01a061e7-9327-7d08-bf82-81f46773aac4",
  pageTypeSlug: "module",
  slug: "zone-names-zh-02",
  definition: "part 02 of every zone's name in zh",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
