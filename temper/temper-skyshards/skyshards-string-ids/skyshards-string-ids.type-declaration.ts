import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const skyshardsStringIds = {
  id: "01a061a8-9c6c-77af-ab8d-fc301a1713ff",
  pageTypeSlug: "type-declaration",
  slug: "skyshards-string-ids",
  definition: "the string identifiers this add-on holds its own English text under",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The text these identifiers hold is English alone.",
    },
  ],
} as const satisfies TypeDeclaration
