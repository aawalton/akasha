import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests00 = {
  id: "01a06269-2a84-7065-897a-75e89e3eea38",
  type: "module",
  slug: "map-pins-chests-00",
  definition: "one run of the treasure chest places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
