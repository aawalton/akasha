import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const slashCommanderDeclarations = {
  id: "01a06066-8404-79a4-bfb3-28f543c2cd7a",
  pageTypeSlug: "type-declaration",
  slug: "slash-commander-declarations",
  definition: "the Lua and game names this addon reaches without importing them",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the names the code here reaches are declared.",
    },
    {
      invariantKind: "stopgap",
      statement: "This page restates declarations the game keeps outside akasha.",
    },
  ],
} as const satisfies TypeDeclaration
