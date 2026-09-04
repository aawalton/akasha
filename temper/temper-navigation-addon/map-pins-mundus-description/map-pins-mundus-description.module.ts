import type { Module } from "@akasha/code-system/module"

export const mapPinsMundusDescription = {
  id: "01a06269-2ae2-7c0e-9ff7-d798afc9d5d4",
  pageTypeSlug: "module",
  slug: "map-pins-mundus-description",
  definition: "the description of each mundus stone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
