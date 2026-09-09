import type { Module } from "@akasha/code/module"

export const hudAddonTypes = {
  id: "01a061c5-18dd-7000-bd52-66ec64cec528",
  pageTypeSlug: "module",
  slug: "hud-addon-types",
  definition: "the shapes a HUD field, a HUD cell, a Temper command and the saved variables take",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field states the order that field sits in the bar at.",
    },
    {
      invariantKind: "departure",
      statement: "A cell has its own color and its own transparency.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here calls a game function.",
    },
  ],
} as const satisfies Module
