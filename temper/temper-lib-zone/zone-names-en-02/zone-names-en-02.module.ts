import type { Module } from "@akasha/code-system/module"

export const zoneNamesEn02 = {
  id: "01a061e7-930c-7af6-af4b-9bfbd7d6acf6",
  pageTypeSlug: "module",
  slug: "zone-names-en-02",
  definition: "part 02 of every zone's name in en",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
