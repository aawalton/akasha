import type { Module } from "@akasha/code/module"

export const minimapViewTypes = {
  id: "01a06269-2b11-7ab4-91ef-f78f20b801bc",
  pageTypeSlug: "module",
  slug: "minimap-view-types",
  definition: "the minimap's loose views of the game tables the minimap reaches into",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A shape here is the members the minimap reads of a game table rather than the game's declaration.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
