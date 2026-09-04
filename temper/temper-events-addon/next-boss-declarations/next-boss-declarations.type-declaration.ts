import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const nextBossDeclarations = {
  id: "01a0620a-a165-79b6-89ee-06d189040e29",
  pageTypeSlug: "type-declaration",
  slug: "next-boss-declarations",
  definition: "the string ids and layout controls this tracker makes for itself",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A string id here is made at load rather than shipped with the game.",
    },
    {
      invariantKind: "departure",
      statement: "A control here is declared by this add-on's own XML document.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "A name the game or a library owns is declared in the shared set instead.",
    },
  ],
} as const satisfies TypeDeclaration
