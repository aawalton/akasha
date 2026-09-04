import type { Module } from "@akasha/code-system/module"

export const hudSceneFragments = {
  id: "01a060a4-fa3b-7a5a-9dbd-b12ae75da9e4",
  pageTypeSlug: "module",
  slug: "hud-scene-fragments",
  definition: "the HUD parts one scene adds for itself",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A part here belongs to the one scene adding the part.",
    },
    {
      invariantKind: "departure",
      statement: "A part here is hidden by the scene rather than by the fragment group.",
    },
  ],
} as const satisfies Module
