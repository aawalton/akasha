import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations16 = {
  id: "01a06181-3842-796e-a3f0-c1f3c40c667a",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-16",
  definition:
    "one run of the Shalidor's Library location table, in the order the whole table names it",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
