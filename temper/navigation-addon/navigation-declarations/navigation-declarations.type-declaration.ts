import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const navigationDeclarations = {
  id: "01a06269-2b16-7e93-92d5-2c6e6bb9cb17",
  type: "page-type/type-declaration",
  slug: "navigation-declarations",
  definition:
    "the tables this add-on publishes under its four names, and the font and saved variables it makes",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The minimap's table is declared by the members the key bindings reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the game or a library owns is declared in the shared set instead.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies TypeDeclaration
