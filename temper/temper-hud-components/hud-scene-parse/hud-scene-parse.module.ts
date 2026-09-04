import type { Module } from "@akasha/code-system/module"

export const hudSceneParse = {
  id: "01a060a4-fa3a-750c-9ca2-1bb7318f8b00",
  pageTypeSlug: "module",
  slug: "hud-scene-parse",
  definition: "the HUD parts read out of the game's own scene source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name listed in the game's HUD fragment group belongs to every HUD scene.",
    },
    {
      invariantKind: "departure",
      statement: "A fragment one scene adds by itself belongs to that scene alone.",
    },
    {
      invariantKind: "departure",
      statement: "A control named beside a hide method is catalogued under that method.",
    },
    {
      invariantKind: "departure",
      statement: "A call sitting under a nearby condition is marked conditional.",
    },
    {
      invariantKind: "departure",
      statement: "One ESO global found twice is merged into one record.",
    },
    {
      invariantKind: "departure",
      statement: "A global found under two kinds refuses the reading rather than being guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "The fragments come before the controls.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
