import type { Module } from "@akasha/code-system/module"

export const hudSceneCatalog = {
  id: "01a060a4-fa3b-751a-8639-e3b67666c6b8",
  pageTypeSlug: "module",
  slug: "hud-scene-catalog",
  definition: "every part of the game's HUD, in the order the reading finds each part",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog holds every part the game's HUD fragment group names.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog holds every part a scene adds for itself.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog holds every part hidden as a control.",
    },
    {
      invariantKind: "departure",
      statement: "The order here is the order the reading gives.",
    },
    {
      invariantKind: "departure",
      statement: "One ESO global appears once.",
    },
  ],
} as const satisfies Module
