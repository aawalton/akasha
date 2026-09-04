import type { Module } from "@akasha/code-system/module"

export const mapPinsBosses00 = {
  id: "01a06269-2a4b-7992-9cb3-9aab9aba8baa",
  pageTypeSlug: "module",
  slug: "map-pins-bosses-00",
  definition: "one run of the world boss places by zone",
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
