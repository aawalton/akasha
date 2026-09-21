import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const esoKeybindings = {
  id: "01a06381-67c1-7c64-b1db-c19ebd0acd9e",
  type: "page-type/type-declaration",
  slug: "eso-keybindings",
  definition: "the key-bind window the game opens and the calls that rebind a key",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is the game's own rather than a library's.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Rebinding is a protected call the game refuses to an untrusted caller.",
    },
  ],
} as const satisfies TypeDeclaration
