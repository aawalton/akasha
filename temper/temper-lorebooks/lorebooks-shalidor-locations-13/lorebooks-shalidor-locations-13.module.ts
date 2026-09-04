import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lorebooksShalidorLocations13 = {
  id: "01a06181-3841-7cce-bfce-35c03b6ecd06",
  pageTypeSlug: "module",
  slug: "lorebooks-shalidor-locations-13",
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
