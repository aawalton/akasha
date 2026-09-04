import type { Module } from "@akasha/code-system/module"

export const mapPinsMiningSampleTooltip = {
  id: "01a06269-2ae1-7438-ae5d-0cfd8d246c51",
  pageTypeSlug: "module",
  slug: "map-pins-mining-sample-tooltip",
  definition: "the tooltip of each mining sample",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
