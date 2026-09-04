import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const debugLoggerDeclarations = {
  id: "01a0620a-a166-7f46-895d-4d74d6165dbc",
  pageTypeSlug: "type-declaration",
  slug: "debug-logger-declarations",
  definition: "the Lua and game names this library reaches without importing them",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "departure",
      statement: "A file reaching a declared name imports this module for the declaration.",
    },
    {
      invariantKind: "departure",
      statement: "A value is declared with `var` so a second addon declaring the same name merges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies TypeDeclaration
