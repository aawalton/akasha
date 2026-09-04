import type { Module } from "@akasha/code-system/module"

export const hudFragmentGroup = {
  id: "01a060a4-fa3a-751e-a08d-fa06474540f8",
  pageTypeSlug: "module",
  slug: "hud-fragment-group",
  definition: "the HUD parts the game's own fragment group holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every part here belongs to all three HUD scenes.",
    },
    {
      invariantKind: "departure",
      statement: "A part here is hidden through the fragment group.",
    },
  ],
} as const satisfies Module
