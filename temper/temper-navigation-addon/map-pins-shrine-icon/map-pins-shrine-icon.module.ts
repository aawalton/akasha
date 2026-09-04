import type { Module } from "@akasha/code-system/module"

export const mapPinsShrineIcon = {
  id: "01a06269-2aea-740e-8964-1601c38c8591",
  pageTypeSlug: "module",
  slug: "map-pins-shrine-icon",
  definition: "the icon of each shrine",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
