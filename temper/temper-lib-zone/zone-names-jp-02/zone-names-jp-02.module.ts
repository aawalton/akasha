import type { Module } from "@akasha/code-system/module"

export const zoneNamesJp02 = {
  id: "01a061e7-9319-7482-b3f0-c65558f255d0",
  pageTypeSlug: "module",
  slug: "zone-names-jp-02",
  definition: "part 02 of every zone's name in jp",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These rows are what upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
