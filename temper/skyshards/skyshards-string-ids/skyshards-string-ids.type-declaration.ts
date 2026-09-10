import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.types.ts"

export const skyshardsStringIds = {
  id: "01a061a8-9c6c-77af-ab8d-fc301a1713ff",
  pageTypeSlug: "type-declaration",
  type: "type-declaration",
  slug: "skyshards-string-ids",
  definition: "the string identifiers this add-on has its own English text under",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The text these identifiers have is English alone.",
    },
  ],
} as const satisfies TypeDeclaration
