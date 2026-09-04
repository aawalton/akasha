import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const keybinderDeclarations = {
  id: "01a06381-67c1-7169-bc94-c11e7fb0d171",
  pageTypeSlug: "type-declaration",
  slug: "keybinder-declarations",
  definition: "the key-bind shapes only this add-on reaches",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape a second package reaches is declared in the shared game typings.",
    },
    {
      invariantKind: "departure",
      statement: "What is left here is what this add-on alone reads.",
    },
  ],
} as const satisfies TypeDeclaration
