import type { Module } from "@akasha/code-system/module"

export const zoneTypes = {
  id: "01a061e7-92f1-7d24-873f-7531d9341088",
  pageTypeSlug: "module",
  slug: "zone-types",
  definition: "the shapes zone data, the library object and the slash-command library take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The slash-command library is shaped here rather than in the shared game declarations.",
    },
  ],
} as const satisfies Module
