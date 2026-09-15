import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const mediaDeclarations = {
  id: "01a0620a-a168-770b-99ab-0f8790dd4a01",
  type: "page-type/type-declaration",
  slug: "media-declarations",
  definition: "the Lua and game names this library reaches without importing them",
  d: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file reaching a declared name imports this module for the declaration.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is declared with `var` so a second addon declaring the same name merges.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies TypeDeclaration
