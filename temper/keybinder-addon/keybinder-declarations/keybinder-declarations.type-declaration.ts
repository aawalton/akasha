import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const keybinderDeclarations = {
  id: "01a06381-67c1-7169-bc94-c11e7fb0d171",
  type: "type-declaration",
  slug: "keybinder-declarations",
  definition: "the key-bind shapes only this add-on reaches",
  d: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape a second package reaches is declared in the shared game types.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shapes left here are the shapes the keybinder add-on alone reads.",
    },
  ],
} as const satisfies TypeDeclaration
