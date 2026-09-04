import type { Module } from "@akasha/code-system/module"

export const hudAddonHidePlan = {
  id: "01a061c5-18dd-700b-9e4a-ac33f45c2a8f",
  pageTypeSlug: "module",
  slug: "hud-addon-hide-plan",
  definition: "what hiding to carry out, worked out from the catalog and what the player asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A registration naming no part in the catalog is left out of the plan.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here touches a game control.",
    },
  ],
} as const satisfies Module
