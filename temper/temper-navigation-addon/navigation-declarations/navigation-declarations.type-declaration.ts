import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const navigationDeclarations = {
  id: "01a06269-2b16-7e93-92d5-2c6e6bb9cb17",
  pageTypeSlug: "type-declaration",
  slug: "navigation-declarations",
  definition:
    "the tables this add-on publishes under its four names, and the font and saved variables it makes",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The minimap's table is declared by the members the key bindings reach.",
    },
    {
      invariantKind: "departure",
      statement: "A name the game or a library owns is declared in the shared set instead.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies TypeDeclaration
