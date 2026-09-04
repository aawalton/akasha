import type { Module } from "@akasha/code-system/module"

export const destinationsChampionsData01 = {
  id: "01a06269-29b2-77c6-8646-fad9d5832e09",
  pageTypeSlug: "module",
  slug: "destinations-champions-data-01",
  definition: "one run of the champion (dolmen and world boss) achievement rows by zone",
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
