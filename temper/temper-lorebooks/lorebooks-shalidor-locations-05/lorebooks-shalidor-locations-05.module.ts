import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations05 = {
  id: "01a06181-383f-7245-854a-c83330a1dafa",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-05",
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
