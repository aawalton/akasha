import type { Module } from "@akasha/code-system/module"

export const destinationsSharedData05 = {
  id: "01a06269-29e4-731f-bc85-4fecb8e869a5",
  pageTypeSlug: "module",
  slug: "destinations-shared-data-05",
  definition: "one run of the shared achievement rows by zone, and the stables, docks and portals",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
