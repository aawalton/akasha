import type { Module } from "@akasha/code/module"

export const libSetsConstTextures = {
  id: "01a061d7-7bc5-727f-88ac-49e2a8ab5686",
  pageTypeSlug: "module",
  slug: "lib-sets-const-textures",
  definition:
    "the game's own armour, weapon and Undaunted chest keeper names, gathered per language",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A supported language table that is not English is given the English table as its fallback.",
    },
  ],
} as const satisfies Module
