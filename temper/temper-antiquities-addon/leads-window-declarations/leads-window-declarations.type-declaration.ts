import type { TypeDeclaration } from "../../../code-system/type-declarations/type-declaration.page-type.ts"

export const leadsWindowDeclarations = {
  id: "01a06274-b08b-7ce4-9c42-df97b97f5da8",
  pageTypeSlug: "type-declaration",
  slug: "leads-window-declarations",
  definition: "the lead window's controls and the shape of one row of its list",
  d: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Every name here is declared by the markup rather than by any code.",
    },
  ],
} as const satisfies TypeDeclaration
