import type { Module } from "@akasha/code-system/module"

export const mapPinsWrothgarRelics = {
  id: "01a06269-2b0e-7f24-9349-1f8a948fdcad",
  pageTypeSlug: "module",
  slug: "map-pins-wrothgar-relics",
  definition: "the Wrothgar relic places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
