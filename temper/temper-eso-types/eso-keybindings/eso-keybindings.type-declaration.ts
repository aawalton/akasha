import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const esoKeybindings = {
  id: "01a06381-67c1-7c64-b1db-c19ebd0acd9e",
  pageTypeSlug: "type-declaration",
  slug: "eso-keybindings",
  definition: "the key-bind window the game opens and the calls that rebind a key",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here is the game's own rather than a library's.",
    },
    {
      invariantKind: "constraint",
      statement: "Rebinding is a protected call the game refuses to an untrusted caller.",
    },
  ],
} as const satisfies TypeDeclaration
