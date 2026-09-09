import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const alchemyStationDeclarations = {
  id: "01a0620a-a167-700f-b76f-c3f7f43297aa",
  pageTypeSlug: "type-declaration",
  slug: "alchemy-station-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
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
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "stopgap",
      statement: "This module restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies TypeDeclaration
