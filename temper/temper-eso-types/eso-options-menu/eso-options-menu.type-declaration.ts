import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const esoOptionsMenu = {
  id: "01a06259-bfbb-741e-b9cc-630b4b8a9583",
  pageTypeSlug: "type-declaration",
  slug: "eso-options-menu",
  definition: "the game's settings menu names that more than one add-on reaches",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name here keeps the spelling the game gives that name.",
    },
    {
      invariantKind: "constraint",
      statement: "One declaration here serves every package reaching the name.",
    },
    {
      invariantKind: "absence",
      statement: "A compiler emits nothing from this file.",
    },
  ],
} as const satisfies TypeDeclaration
