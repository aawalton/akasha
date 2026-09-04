import type { Module } from "@akasha/code-system/module"

export const mapPinsMuralMenderFragments = {
  id: "01a06269-2ae3-7fef-983f-48ead7dcd064",
  pageTypeSlug: "module",
  slug: "map-pins-mural-mender-fragments",
  definition: "the mural fragment places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
